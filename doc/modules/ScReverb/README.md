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
* `constructor(context, options={})`

Initializes ScReverb instance by setting up the Web Audio graph with a convolver node. It loads all the presets by making 
`XMLHttpRequest` for each preset asynchronously and waits until audio data is decoded and loaded in memory as audio buffers.

* `set preset(presetName)`

A preset setter for a valid presetName.

## Presets 
Following are the currently supported:
* Hall
* Tunnel
* Bridge
* Stairwell
* Room
