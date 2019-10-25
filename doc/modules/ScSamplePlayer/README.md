# Soundcool Sample Player module
This document specifies the user interface and Web Audio implementation of SamplePlayer in Soundcool.
## User Interface
![alt text](https://github.com/rbdannenberg/soundcool/blob/master/doc/modules/ScSamplePlayer/ui_sample_player.png)


## Web Audio Implementation
Following are class attributes and methods that SamplePlayer supports:
### Attributes
#### `players`
A JS array containing 10 instances of ScPlayer.
### Methods
#### `setupNodes()`
Instantiates 10 ScPlayer objects and populates them in `players` array. Audio buffers are initialized to `null` 
(refer [this](https://www.w3.org/TR/webaudio/#AudioBufferSourceNode-attributes)).
#### `load(playerIndex, path)` 
Loads audio from `path` in a ScPlayer instance specified by `playerIndex`. Returns a promise object that is resolved when loaded into audio buffer and rejected if the loading fails.
#### `reverse()`
Reverses playback from playhead position. Internally, reverses the buffer and resumes playback from playhead.
#### `play(playerIndex)`
Start playback on ScPlayer instance specified by `playerIndex`.
#### `pause(playerIndex)`
Pauses playback on ScPlayer instance specified by `playerIndex`.
#### `stop(playerIndex)`
Stops playback on ScPlayer instance specified by `playerIndex`.
#### `set speed(value)`
Set the playback speed for all ScPlayers. `value` is a real number between `0` and `2`; for examples, `value` of `0` is equivalent to pause.
#### `set loop(value)`
Enable/Disable looping on all ScPlayers. `value` is either `true` / `false`.
#### `set random(value)`
