import ScModule from "./sc-module.js";

function sampleFloat(min, max) {
  return (Math.random() * (max - min) + min);
}

function sampleJitterCoeff(min, max, param, jitter) {
    let x = jitter === 0 ? 0 : 0.5 + ((min - param) / jitter);
    let lowerBound = x > 0 ? -0.5 + x : -0.5;
    let y = jitter === 0 ? 0 : ((max - param) / jitter) - 0.5;
    let upperBound = y < 0 ? 0.5 + y : 0.5;
    let R = sampleFloat(lowerBound, upperBound);
    return R;
}

function sampleTruncExp(a, b, rate){
  let x = Math.random();
  return -Math.log(Math.exp(-rate * a) - x *
    (Math.exp(-rate * a) - Math.exp(-rate * b))) / rate;
}

class Grain {

  constructor(context, buffer, dest, envelopeBuffer) {
    this.context = context;
    this.dest = dest;
    this.envelopeBuffer = envelopeBuffer;
    this.setupNodes(buffer);
  }

  setupNodes(buffer) {
    // nodes
    this.absn = this.context.createBufferSource();
    this.absn.buffer = buffer;
    this.absn.loop = true;
    this.panner = this.context.createStereoPanner();
    this.envelope = this.context.createBufferSource();
    this.envelope.buffer = this.envelopeBuffer;
    this.gain = this.context.createGain();
    this.gain.gain.cancelScheduledValues(0);
    this.gain.gain.setValueAtTime(0, 0);

    // connections
    this.absn.connect(this.gain);
    this.envelope.connect(this.gain.gain);
    this.gain.connect(this.panner);
    this.panner.connect(this.dest);
  }

  destroy() {
    // disassemble
    this.absn.disconnect(this.gain);
    this.envelope.disconnect(this.gain.gain);
    this.gain.disconnect(this.panner);
    this.panner.disconnect(this.dest);
  }
}

class GrainPlayer {

  constructor(context, buffer, rate, dest, schedAhead) {
    this.grains = [];
    this.context = context;
    this.buffer = buffer;
    this.rate = rate;
    this.dest = dest;
    this.envelopeBufferDur = 1; // in seconds
    this.schedAhead = schedAhead;
    this.computeEnvelopeBuffer(this.envelopeBufferDur);
    this.grainScheduledTimes = [];
  }

  getPreScheduled(now) {
    let count = 0;
    for (let i = 0; i < this.grainScheduledTimes.length; i++) {
      if (this.grainScheduledTimes[i] > now) {
        count += 1;
      }
    }
    return count;
  }

  grainCleanup(grain) {
    let grainIndex = this.grains.indexOf(grain);
    this.grains.splice(grainIndex, 1);
    this.grainScheduledTimes.splice(grainIndex, 1);
    grain.destroy();
  }

  schedule(gStart, gDur, gWhen, gPShift, gPan) {
    let grain;
    grain = new Grain(this.context, this.buffer, this.dest,
      this.envelopeBuffer);
    // let gEnd = gWhen + gDur;
    grain.absn.detune.value = gPShift;
    grain.envelope.detune.value = gPShift;
    let envPBRate = this.envelopeBufferDur /  (gDur * Math.pow(2, gPShift / 1200));
    grain.envelope.playbackRate.value = envPBRate;
    grain.panner.pan.value = gPan;
    grain.envelope.start(gWhen, 0);
    grain.absn.start(gWhen, gStart);
    grain.envelope.onended = function(evt) {
      this.grainCleanup(grain);
    }.bind(this);
    this.grains.push(grain);
    this.grainScheduledTimes.push(gWhen);
    /* // debugging
    console.log('now: ', this.context.currentTime, ' | gWhen: ', gWhen,
      ' | gStart: ', gStart, ' | gEnd: ', gEnd, ' | gDur: ', gDur,
      ' | envPB: ', envPBRate, ' | gPShift: ', gPShift, ' | pan: ', gPan);
    */
  }

  computeEnvelopeBuffer(buffDur) {
    let buffLen = buffDur * this.context.sampleRate;
    let nodeBuff = this.context.createBuffer(
      2,
      buffLen,
      this.context.sampleRate
    );
    let bufferL = nodeBuff.getChannelData(0);
    let bufferR = nodeBuff.getChannelData(1);
    let step = 2 / (buffLen - 1);
    let x = -1;
    for (let i = 0; i < buffLen; i++) {
      bufferL[i] = 0.5 * (1 + Math.cos(Math.PI * x));
      bufferR[i] = 0.5 * (1 + Math.cos(Math.PI * x));
      x += step;
    }
    this.envelopeBuffer = nodeBuff;
  }

  grainsToSchedule() {
    let now = this.context.currentTime;
    // let schedEnd = now + this.schedAhead;
    let n = Math.ceil(this.rate * this.schedAhead);
    let preScheduled = this.getPreScheduled(now);
    return n - preScheduled;
  }
}

class ScGranSynth extends ScModule {

  constructor(context, options={}) {
    super(context);
    let defOpts = {
      rate: 100,
      dur: 0.05,
      dBufferDur: 40, // len of delay buffer in seconds
      expectedLatency: .1, // in msec
      schedLookAhead: 2, // in sec

      // Delay defaults
      delay: 1,
      delayJitter: 20,
      minDelay: 0,
      maxDelay: 20,

      // Pitch shift defaults
      pitchShift: 0,
      pitchJitter: 0,
      minPShift: -2400,
      maxPShift: 2400,

      // Pan defaults
      pan: 0,
      panJitter: 0,
      minPan: -1,
      maxPan: 1,

      // IOI defaults
      truncExpLow: 0,
      truncExpHigh: 5,
      ioiJitter: 0.5

    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  sampleIOI() {
    let rate = this.options.rate;
    let randInterval = sampleTruncExp(this.options.truncExpLow,
      this.options.truncExpHigh, rate);
    let jitter = this.options.ioiJitter;
    return (1 - jitter) * (1 / rate) + jitter * randInterval;
  }

  computeGDelay() {
    let min = this.options.minDelay;
    let max = this.options.maxDelay;
    let param = this.options.delay;
    let jitter = this.options.delayJitter;
    let R = sampleJitterCoeff(min, max, param, jitter);
    param = param + (R * jitter);
    return param;
  }

  computeGTranspose() {
    let min = this.options.minPShift;
    let max = this.options.maxPShift;
    let param = this.options.pitchShift;
    let jitter = this.options.pitchJitter;
    let R = sampleJitterCoeff(min, max, param, jitter);
    param = param + (R * jitter);
    return param;
  }

  computeGPan() {
    let min = this.options.minPan;
    let max = this.options.maxPan;
    let param = this.options.pan;
    let jitter = this.options.panJitter;
    let R = sampleJitterCoeff(min, max, param, jitter);
    param = param + (R * jitter);
    return param;
  }

  setupNodes() {
    this.inNode = this.context.createGain();
    this.outNode = this.context.createGain();
    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
    this.scriptNode = this.context.createScriptProcessor(4096, 2, 2);
    this.inNode.connect(this.scriptNode);
    this.scriptNode.connect(this.outNode);

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
    this.grainDur = this.options.grainDur;
    this.buffTimeStamp = this.context.currentTime;
    this.dBufferWPtr = parseInt(this.sampleRate * (this.buffTimeStamp % this.dBufferDur));
    this.prevGTime = null;
    this.grainPlayer = new GrainPlayer(this.context, this.dBuffer, this.options.rate,
      this.outNode, this.options.schedLookAhead);

    this.scriptNode.onaudioprocess = function(event) {
      let liveBuffer = event.inputBuffer;
      let liveBuffDataL = liveBuffer.getChannelData(0);
      let liveBuffDataR = liveBuffer.getChannelData(1);
      // need to do this for it to work in FF
      this.dBufferArrL = this.dBuffer.getChannelData(0);
      this.dBufferArrR = this.dBuffer.getChannelData(1);
      for (let i = 0; i < liveBuffDataL.length; i++) {
        this.dBufferWPtr = (this.dBufferWPtr + 1) % this.dBufferLen;
        this.dBufferArrL[this.dBufferWPtr] = liveBuffDataL[i];
        this.dBufferArrR[this.dBufferWPtr] = liveBuffDataR[i];
      }

      let grainsToSchedule = this.grainPlayer.grainsToSchedule();
      let liveBuffDur = liveBuffDataL.length / this.sampleRate;
      this.buffTimeStamp += liveBuffDur;
      // let now = this.context.currentTime;
      // let onsets = 0;
      for (let i = 0; i < grainsToSchedule; i++) {
        let ioi = this.sampleIOI();
        if (this.prevGTime === null) { 
          this.prevGTime = this.context.currentTime;
        }
        let gWhen = this.prevGTime + ioi;
        let gDelay = this.computeGDelay();
        let offset = gWhen - gDelay - this.options.expectedLatency;
        if (offset < 0) {
          this.prevGTime = null;
          continue;
        }
        let gStart = offset % this.dBufferDur;
        let gPShift = this.computeGTranspose();
        let gPan = this.computeGPan();
        let gDur = this.options.dur;

        // schedule
        this.grainPlayer.schedule(gStart, gDur, gWhen, gPShift, gPan);
        this.prevGTime = gWhen;
        // onsets += ioi;
      }

    }.bind(this);
  }

  set rate(desiredRate) {
    this.options.rate = parseInt(desiredRate);
  }

  set ioiJitter(desiredJitter) {
    this.options.ioiJitter = parseFloat(desiredJitter);
  }

  set dur(desiredDur) {
    this.options.dur = parseFloat(desiredDur);
  }

  set pitchShift(desiredPitch) {
    this.options.pitchShift = parseInt(desiredPitch);
  }

  set pitchJitter(desiredJitter) {
    this.options.pitchJitter = parseInt(desiredJitter);
  }

  set pan(desiredPan) {
    this.options.pan = parseFloat(desiredPan);
  }

  set panJitter(desiredJitter) {
    this.options.panJitter = parseFloat(desiredJitter);
  }

  set delay(desiredDelay) {
    this.options.delay = parseFloat(desiredDelay);
  }

  set delayJitter(desiredJitter) {
    this.options.delayJitter = parseFloat(desiredJitter);
  }

}

export default ScGranSynth;
