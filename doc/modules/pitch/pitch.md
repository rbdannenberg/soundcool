# Soundcool's Pitch Shift Documentation

This document describes how the setters work in soundcool's pitch shifter implemented in Web Audio.
## Terminology
R = audio sampling rate  
t = transposition expressed as a ratio e.g. 3/2 means up a fifth  
<img src="https://latex.codecogs.com/gif.latex?f_{saw}"/>
= frequency of sawtooth wave  
s = upperbound of the delayTime audio param (also the peak amplitude of sawtooth modulating delay lines)  

## Variables
* grainSize: this will be 1 period of sawtooth LFOs <img src="https://latex.codecogs.com/gif.latex?(1/f_{saw})"/>. Range: [0.01, 0.1] seconds. Default: 0.1 s.  
* pitch: the amount of pitch shift. Shift of zero is same as input. Range: [-1200, 1200] cents. Default: 0 cents.

## Setting pitch
If the mapping is 1:1, we get no transposition. If the mapping has slope 2, then every second of output 
plays 2 seconds of input, so the transposition is one octave up. Similarly, if slope = 1/2, we cover only 0.5 
seconds of input per second, so the transposition is one octave down. The slope of the mapping is always 1 minus 
the slope of the delay amount. Not derived here, but if the delay is the constant 0, we still get a slope of 1, 
and if the delay increases at slope 1s per sec, the mapping from output to input is a constant, so the slope is 0. So: 
  
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?t&space;=&space;Slope_{mapping}&space;=&space;1&space;-&space;Slope_{saw}"/>
</p>

Slope of sawtooth is given by  
<img src="https://latex.codecogs.com/gif.latex?=&space;\frac{\Delta&space;y_{saw}}{\Delta&space;x_{saw}}"/>  
<img src="https://latex.codecogs.com/gif.latex?=&space;\frac{s}{1&space;/&space;f_{saw}}"/>
  
<p align="center">
<img align="center" src="https://latex.codecogs.com/gif.latex?Slope_{saw}&space;=&space;f_{saw}&space;*&space;s"/>
</p>

From above equations and solving for s, we get:
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?s&space;=&space;\frac{(1-t)}{f_{saw}}"/>
</p>

To be concrete, the slope will be positive if pitch is to be shifted down and negative if the pitch is to be shifted up.
In the implementation we compute the absolute slope and rescale the range to get correct signed slope.

## Setting grainSize
If users alter grain size, we change the frequency given by:  
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?f_{saw}&space;=&space;1/grainSize"/>
</p>

to user specified value and 
recompute the slope using the above setter.
