import ScModule from "./sc-module.js";

function makeEqualPowerCurve(buffLen = 4096) {
  var buffer = new Float32Array(buffLen);
  let x;
  for (let i = 0; i < buffLen; i++) {
    x = 2 * (i / (buffLen - 1)) - 1;
    if (Math.abs(x) < 0.001) {
      buffer[i] = 0;
    } else {
      buffer[i] = Math.sin(Math.PI * 0.5 * x);
    }
  }
  return buffer;
}

class GrainPlayer {

  constructor(context, numGrains, destination) {
    let gains = [];
    let curve = makeEqualPowerCurve();
    for (let i = 0; i < numGrains; i++) {
      let gain = context.createGain();
      gain.cancelScheduledValues(0);
      gain.setValueAtTime(0, 0);
      let env = context.createWaveShaper();
      env.curve = curve;
      gain.connect(env);
      env.connect(destination);
      gains.push(gain);
    }
    return gains;
  }
}

class ScGranSynth extends ScModule {

  constructor(context, options={}) {
    super(context);
    let defOpts = {
      grainsPS: 10,  // grains per second
      grainDur: 50,  // in msec
      dBufferDur: 5,    // len of delay buffer in seconds
      minGrainSize: 1, // in msec
      maxGrainSize: 50,  // in msec
      expectedLatency: .1 // in msec
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  schedule(currTime) {
    console.log('currTime: ',currTime);
    let maxOffset = this.dBufferDur - this.options.grainDur;
    let startOffset = Math.random() * maxOffset;
    console.log('offset: ', startOffset);
    let grain = this.context.createBufferSource();
    grain.buffer = this.dBuffer;
    grain.connect(this.outNode);
    grain.start(currTime, startOffset, startOffset + this.options.grainDur);
    grain.onended = this.schedule.bind(this, currTime + 1);
  }

  startGrainSampler() {
    let currTime = this.context.currentTime;
    let offsetUnits = 1 / this.options.grainsPS;
    for (let i = 0; i < this.options.grainsPS; i++) {
      let callback = this.schedule.bind(this, currTime);
      callback();
      currTime += offsetUnits;
    }
  }

  setupNodes() {
    this.inNode = this.context.createGain();
    this.outNode = this.context.createGain();
    //this.grainPlayer = new GrainPlayer(this.context, this.options.grainPS,
    //  this.outNode);
    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
    this.scriptNode = this.context.createScriptProcessor(4096, 2, 2);
    this.inNode.connect(this.scriptNode);
    this.scriptNode.connect(this.outNode);
    this.inNode.connect(this.outNode);

    // Input buffer settings
    this.dBufferDur = this.options.dBufferDur;
    this.sampleRate = this.context.sampleRate;
    this.dBufferLen = this.sampleRate * this.dBufferDur;
    this.dBuffer = this.context.createBuffer(
      2,
      this.dBufferLen,
      this.sampleRate
    );
    this.dBufferArrL = this.dBuffer.getChannelData(0);
    this.dBufferArrR = this.dBuffer.getChannelData(1);
    this.dBufferWPtr = -1;
    this.grainDur = this.options.grainDur;

    this.scriptNode.onaudioprocess = function(event) {
      let liveBuffer = event.inputBuffer;
      let liveBuffDataL = liveBuffer.getChannelData(0);
      let liveBuffDataR = liveBuffer.getChannelData(1);
      for (let i = 0; i < liveBuffDataL.length; i++) {
        this.dBufferWPtr = (this.dBufferWPtr + 1) % this.dBufferLen;
        this.dBufferArrL[this.dBufferWPtr] = liveBuffDataL[i];
        this.dBufferArrR[this.dBufferWPtr] = liveBuffDataR[i];
      }
      let currDur = (this.dBufferWPtr / this.sampleRate);
      this.sampleRPtr = (currDur + 0.1) % this.dBufferDur;
      this.sampleLPtr = currDur - (this.grainDur / 1000);
      if (this.sampleLPtr < 0) {
        // sample from RPtr to dBufferDur - this.grainDur / 1000
      } else if (this.sampleRPtr < this.sampleLPtr) {
        // sample from RPtr to LPtr
      } else {
        // sample from 0 to currDur - [LPtr, RPtr]
        console.log(currDur, this.sampleRPtr, this.sampleLPtr);
      }
    }.bind(this);

    // start grain sampler
    //this.startGrainSampler();
  }
}

export default ScGranSynth;
