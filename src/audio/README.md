# soundcool/audio

This part of the project defines classes built on top of Web Audio that will be instantiated by the soundcool user interface to synthesize sound.

## Implementing a module
ScModule definition requires the following:
* A JavaScript class inherited from `ScModule` (defined in `sc-module.js`) if it has a direct mapping to soundcool module (DIRECT INPUT, PLAYER, for example). Inheriting allows us to reuse generic method like `connectTo`.
* Implement a `constructor`. This will be called when user drags a module by hand in the project. It should initialize all Web Audio objects and connect them. The Web Audio node that should act as input to this ScModule should be referenced as `inNode` and the output as `outNode`. Constructor should take context as the argument so that all modules use the same Web Audio `AudioContext` passed during instantiation. The other argument should be `options` to override the default options for that module.
* All the parameters that can be controlled for a ScModule is stored in the `options` attribute for that class. This is a js object. The idea is to have it serializable so that a audio synthesis pipeline can be dumped and restored. Each option should have a pre-defined default options value for the module.
* Define a setter for each ScModule option that can be tweaked from user interface. It should change the value for the option in the `options` and actually set the value of Web Audio node parameter.
* No need to implement disconnect method. `ScModule` implementation is generic.
* Define `destroy` to disconnect all the Web Audio nodes and remove audio node from the audio context. This method will be called when user removes a module from the project (this is not implemented for any modules).


## Conventions

* The convention adopted for file naming is `sc-{}.js` that defines a class `Sc{}` (camel cased) for a given soundcool module (where `{}` is a placeholder for a soundcool module). For example: `sc-pan.js` defines `ScPan`; `sc-player.js` defines `ScPlayer`.

* Most ScModules have `setupNodes` method for spinning up the Web Audio nodes and connect them. Every ScModule should have an `inNode` and `outNode` that will be used to `connectTo` any two instantiated ScModule objects (refer to ScModule's `connectTo` method).

* Some input sources like `ScDirectIn` and `ScPlayer` are asynchronous. ScDirectIn waits for user permissions; ScPlayer makes an HTTP request to load audio. For example:
```js
let mic = new ScDirectIn(scContext);
let speakers = new ScSpeakers(scContext);
mic.connPromise.then(function(){
    mic.connectTo(speakers)
})
```
