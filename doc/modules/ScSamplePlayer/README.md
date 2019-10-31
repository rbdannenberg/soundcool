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
Enable/Disable looping on all ScPlayers. `value` is a boolean; `false` by default.
#### `set random(value)`
Enable/Disable random sample playback. `value` is a boolean; `false` by default. 
See implementation notes for more information of how it works. 

### Implementation Notes
* When you click on Play, the sound starts to play or continues from where it was paused (always).

* When a sound ends:
    * if LOOP is selected, start playing the sound again
    * otherwise, if RANDOM is selected and no other sound is playing pick another sound at random and start playing it (or if it has been paused, then resume it) (Soundcool seems to add a random silence before playing/resuming the next random sound.)
        * The rationale behind "no other sound is playing" is that the current implementation seems to get confused and turn things off when multiple sounds are playing and you have RANDOM enabled. By having the condition "no other sounds are playing", you can manually start a sound with RANDOM and the behavior will be: the manually started sound will play concurrently with any sound started by RANDOM. When both sounds end, RANDOM will pick a new one.

* When a sound is paused or stopped:
    * the sound is paused or stopped. The rule for when a sound ends and this rule for when a sound is paused or stopped are followed for any other sounds that might still be playing.

