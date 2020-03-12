# ScGranSynth

This a specification for ScGranSynth module. ScGranSynth stands for Soundcool's Granular Synthesis.

## Inputs
* Signal: input signal coming from an instantiated ScModule.
* Grain rate: expected number of grains to be played per second. range: [1, 1000]; default: 100.
* Jitter: specifies jitter (explained below) in grain scheduling. range: [0, 1]; default: 0.5.
* Grain size: size of one grain in seconds. range: [0.01, 1]; default: 0.05.
* Pitch shift: specifies by how much to transpose a grain in cents. range: [-2400, 2400]; default: randomized.
* Grain reverse: specifies if to reverse a grain during playback. default: false.
* Panning: panning during grain playback. range: [-1, 1]. -1 is full left pan; 1 is full right pan. default: randomized.
* Delay: specfies the amount of delay in seconds to samples grains from. range: [1, 10]; default: 5.
* Spread: specifies the spread in seconds around `Delay` time when sampling grains. range: [0, 20]; default: 10.

## Grain Scheduling
The inter-onset interval between two scheduled grains follows a truncated negative exponential distribution:
```
random_interval ~ TruncExp(lambda, a, b)
expected_interval = 1 / rate;
interval = (1 - jitter) * expected_interval + jitter * random_interval
gt(n) = gt(n-1) + interval
```
where, `gt(n)` is scheduled time for nth grain; truncated exponential distribution (i.e. `TruncExp`) is bounded 
by the range `[a, b]`;`lambda` is the rate parameter of the exponential distribution; `rate` above is grain rate.

## Grain Sampling
Grain sampling includes looking back `delay` seconds in the delay buffer and adding a random number controlled by `spread` 
as follows:
```
random_offset ~ Unif(-spread/2, spread/2)
st(n) = gt(n) - delay + random_offset
```
where, `st(n)` is the start time from where nth grain starts playing. 
