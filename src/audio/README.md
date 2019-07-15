# soundcool/audio

This part of the project defines classes built on top of Web Audio that will be instantiated by the soundcool user interface to synthesize sound.

## Implementing a module
ScModule definition requires the following:
* A JavaScript class inherited from `ScModule` (defined in `sc-module.js`) if it has a direct mapping to soundcool module (DIRECT INPUT, PLAYER, for example). For instance:
```js
import ScModule from './sc-module.js';

class ScDelay extends ScModule { ... 
```
Inheriting allows us to reuse generic attributes and methods (like `connectTo`). There are some helper classes like `ScOscillator` and `ScAnalyzer` that do not inherit ScModule but are used by other higher level classes.
* Implement a `constructor` with the following signature:
```js
    constructor(context, options={}){
        super(context);
        ...
    }
```
Constructor should take `context` as the input argument so that all modules share the same Web Audio's `AudioContext` passed during instantiation. The other argument should be `options` to override the default options for that module. This will be called when user drags a module by hand in the project. Inside the constructor, firstly call ScModule's constructor to initialize generic class attributes. Initialize all Web Audio nodes using the passed context and connect them. The Web Audio node that should act as input to this ScModule should be referenced as `this.inNode` and the output as `this.outNode`. Below for example, we have ScPan's implementation:
```js
    setupNodes() {
        this.inNode = this.outNode = this.context.createStereoPanner();
        this.pan = this.options.panVal;
    }
```

* All the parameters that can be controlled for a ScModule is stored in the `options` attribute for that class. This is a JS object refered as `this.options`. The idea is to have it serializable so that a audio synthesis pipeline can be dumped and restored. Each option that a class understands should have a reasonable default value that is set in the constructor if not passed in `options` explicitly. For example `delayTime` and `feedback` are two options supported by ScDelay:
```js
class ScDelay extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {'delayTime':0.1, 'feedback':0.3};
        this.options = Object.assign(defOpts, options);
    }
    ...
```
* Define a setter for each ScModule option that can be tweaked from user interface.  It should change the value for the option in the `options` and actually set the value of Web Audio node parameter. Following setter for example sets `delayFeedback` in `ScDelay`:
```js
    set delayFeedback(val) {
        this.options.feedback = val;
        this.delayGain.gain.value = val;
    }
```

* Define `destroy` to disconnect all the Web Audio nodes and remove audio node from the audio context. This method will be called when user removes a module from the project (this is WIP for existing modules).


## Notes / Conventions
* There is no need to implement `connectTo` / `disconnect` method for classes inherited from `ScModule`. `ScModule` implementation is generic for all modules that it inherits.

* The convention adopted for file naming is `sc-{}.js` that defines a class `Sc{}` (camel cased) for a given soundcool module (where `{}` is a placeholder for a soundcool module). For example: `sc-pan.js` defines `ScPan`; `sc-player.js` defines `ScPlayer`.

* Most ScModules have `setupNodes` method for spinning up the Web Audio nodes and connect them. Every ScModule should have an `inNode` and `outNode` that will be used to `connectTo` any two instantiated ScModule objects (refer to ScModule's `connectTo` method).

* Some input sources like `ScDirectIn` and `ScPlayer` are asynchronous. ScDirectIn waits for user permissions; ScPlayer makes an HTTP request to load audio. To handle this async events, these classes resolve a promise refered as `connPromise` when it is ready for connections. Following example shows how to chain a `ScDirectIn` to `ScSpeaker` object if/when granted the permission from browser:
```js
let mic = new ScDirectIn(scContext);
let speakers = new ScSpeakers(scContext);
mic.connPromise.then(function(){
    mic.connectTo(speakers)
})
```
