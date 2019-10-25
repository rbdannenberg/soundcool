# Soundcool Sample Player module
This document specifies the user interface and Web Audio implementation of SamplePlayer in Soundcool.
## User Interface


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
Loads audio from `path` in a ScPlayer instance specified by `playerIndex`. Return a promise object that is resolved when loaded 
as buffer and rejected if the loading fails.
#### `reverse()`
Reverses playback buffers and resumes playback from current playhead position.
#### `play(playerIndex)`
Start playback on ScPlayer instance specified by `playerIndex`.
#### `pause(playerIndex)`
Pauses playback on ScPlayer instance specified by `playerIndex`.
#### `stop(playerIndex)`
Stops playback on ScPlayer instance specified by `playerIndex`.
#### `set speed(value)`
Set the playback speed for all ScPlayers.
#### `set loop(value)`
Enable/Disable looping on all ScPlayers.
#### `set random(value)`
