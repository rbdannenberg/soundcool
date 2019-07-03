# soundcool/audio

This part of the project defines classes built on top of Web Audio that will be instantiated by the soundcool user interface to synthesize sound.

## Contributing
* All soundcool modules (DIRECT INPUT, PLAYER, for example) are inherited from `ScModule` defined in `sc-module.js`.
* Constructor should take context as the argument so that all modules use the same Web Audio `AudioContext` passed during instantiation.
* The convention adopted for file naming is `sc-{}.js` that defines a class `Sc{}` (camel cased) for a given soundcool module (where `{}` is a placeholder for a soundcool module). For example: `sc-pan.js` defines `ScPan`; `sc-player.js` defines `ScPlayer`.
* All the parameters that can be controlled for a ScModule is stored in the `options` attribute for that class. The idea is to make it serializable so that a music synthesis pipeline can be dumped and restored.
* Most ScModules have `setupNodes` method for spinning up the Web Audio nodes and connect them. Every ScModule should have an `inNode` and `outNode` that will be used to `connectTo` any two instantiated ScModule objects (refer to ScModule's `connectTo` method).
* Define a setter for each ScModule option that can be tweaked from user interface.

## Notes
* Some input sources like `ScDirectIn` and `ScPlayer` are asynchronous. ScDirectIn waits for user permissions; ScPlayer makes an HTTP request to load audio. For example:
```
let mic = new ScDirectIn(scContext);
let speakers = new ScSpeakers(scContext);
mic.connPromise.then(function(){
    mic.connectTo(speakers)
})
```
