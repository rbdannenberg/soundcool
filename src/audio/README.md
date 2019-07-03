# soundcool/audio

This part of the project defines classes built on top of Web Audio that will be instantiated by the soundcool user interface to synthesize sound.

## Contributing
* All soundcool modules (DIRECT INPUT, PLAYER, for example) are inherited from `ScModule` defined in `sc-module.js`.
* Constructor should take context as the argument so that all modules use the same Web Audio `AudioContext` passed during instantiation.
* The convention adopted for file naming is `sc-{}.js` that defines a class `Sc{}` (camel cased) for a given soundcool module (where `{}` is a placeholder for a soundcool module). For example: `sc-pan.js` defines `ScPan`; `sc-player.js` defines `ScPlayer`.
