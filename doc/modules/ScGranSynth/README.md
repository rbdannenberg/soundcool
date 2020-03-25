# ScGranSynth

This a specification for ScGranSynth module. ScGranSynth stands for Soundcool's Granular Synthesis.

## Inputs
Inputs are shown as *uname* (*`cname`*) *description*, where *uname* is the name seen by the user, *`canme`* is the name used in software (code), and *description* is an explanation of the function of the input.
* (`in`) - Input Signal: input signal coming from an instantiated ScModule.
* **Grain Rate** (`rate`) - expected number of grains to be played per second. range: [1, 1000]; default: 100.
* **Timing Jitter** (`ioi_jitter`) - Grain IOI Jitter: specifies jitter (explained below) in grain scheduling. range: [0, 1]; default: 0.5.
* **Duration** (`dur`) - Grain Duration: duration of each grain in seconds. range: [0.01, 1]; default: 0.05.
* **Transpose** (`pitch_shift`) - Pitch Shift: specifies by how much to transpose a grain in cents. range: [-2400, 2400]; default: 0.
* **Transp. Jitter** (`pitch_jitter`) - Pitch Shift Jitter: specifies a range of random pitch shift offset in cents. range: [0, 4800]; default: 0.
* **Reverse** (`reverse`) - Reverse Probability: probability of reversing a grain during playback. range: [0, 1]; default: 0.
* **Pan** (`pan`) - Panning: pan amount during grain playback. range: [-1, 1]. -1 is full left pan; 1 is full right pan. default: 0.
* **Pan Jitter** (`pan_jitter`) - Panning Jitter: specifies a range of random offset added to pan amount for each grain. range: [0, 2]; default: 0.
* **Delay** (`delay`) - Delay: specfies the amount of delay in seconds from input to output. range: [0, 20]; default: 1.
* **Delay Jitter** (`delay_jitter`) - Delay jitter: specifies the spread in seconds around `delay` grains. range: [0, 20]; default: 2.

## Jitter for pitch, pan, and delay
Notes: The pitch shift for each grain is computed by: `pitch_shift + R * pitch_jitter`, where `R` is a uniform random number selected from the range [-1/2, +1/2]. Similarly, the pan amount for each grain is computed by: `pan + R * pan_jitter`, and delay is computed by `delay + R * delay_jitter`, with `R` again selected from [-1/2, + 1/2]. In all these cases, if using the full range of jitter might produce an output that is out of the allowed range, then `R` should be sampled from a smaller range. Do *not* simply compute a full range and then clip it to bounds. Example: `pitch_shift = 1200, pitch_jitter = 3600`, and the allowed range of pitch shifting is -2400 to +2400. The parameters suggest a range of pitch shift from [1200 - 1800, 1200 + 1800] = [-600, 3000], but 3000 is beyond the limit of 2400. Therefore, choose R from [-1/2, 1/3], resulting in a computed pitch shift that is uniform from [1200 - 1800, 1200 + 1200] = [-600, 2400], which is in range.

The limits for pitch shift are -1200 to +1200 (cents). The limits for pan are -1 to +1. The limits for delay are *latency* to 20 (seconds), where *latency* is some minimum time needed to insure the input samples are available before the grain begins. (*latency* may depend on grain duration and whether `reverse` is non-zero.)

## Grain Scheduling
The inter-onset interval between two scheduled grains is a weighted sum of expected interval and a sample from truncated negative exponential distribution:
```
expected_interval = 1 / rate
random_interval ~ TruncExp(expected_interval, a, b)
interval = (1 - ioi_jitter) * expected_interval + ioi_jitter * random_interval
gt(n) = gt(n-1) + interval
```
where `gt(n)` is scheduled time for nth grain; truncated exponential distribution (i.e. `TruncExp`) is bounded 
by the range `[a, b]`;`lambda` is the rate parameter of the exponential distribution; `rate` above is grain rate.

## Grain Sampling
Grain sampling includes looking back `gdelay` (grain delay) seconds in the delay buffer, where `gdelay` is computed as described in the previous section from `delay` and `delay_jitter`.
```
st(n) = gt(n) - gdelay
```
where `st(n)` is the start time from where nth grain starts playing. 
