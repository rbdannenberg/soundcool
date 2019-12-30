# ScReverb Web Audio Impementation
The ScReverb implements convolutional reverb using a convolver node with a preset Impulse Response(IR) buffer.
ScReverb will require a path spec to request for IR audio files. For example:
```javascript
this.irPaths = {
  'tunnel': '../audio/NancyLakeTunnel.wav',
  'stairwell': '../audio/CCRMAStairwell.wav',
  'bridge': '../audio/EchoBridge.wav',
  'theatre': '../audio/MillsGreekTheater.wav'
};
```

## Methods
#### `constructor(context, options={})`
Initializes ScReverb instance by setting up the Web Audio graph with a convolver node. Provides a control over amount of wet signal to output by using an equal power crossfade between dry and wet signal. It loads all the presets by making 
`XMLHttpRequest` for each preset asynchronously and waits until audio data is decoded and loaded in memory as audio buffers.

#### `set preset(presetName)`
A preset setter for a valid presetName.

#### `set mix(value)`
Set mix value to a `float` between `0` and `1`. `0` means ScReverb's output is same as the input. Value of `1` only outputs the signal with the reverb effect applied (i.e. wet signal).

#### `set bypass(value)`
Set bypass value to `true` or `false`. When `true`, the ouput is same as input. 



## Presets 
Following are the currently supported:
* Hall
* Tunnel
* Bridge
* Stairwell
* Room
