import ScModule from "./sc-module.js";

class ScEnvelope extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      loop: false,
      dur: 1.0
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  setupNodes() {
    this.outNode = this.inNode = this.context.createGain();
    this.adder = this.context.createGain();
    this.outNode.gain.cancelScheduledValues(0);
    this.outNode.gain.setValueAtTime(0, 0);
    this.sustain = this.context.createConstantSource();
    this.sustain.offset.value = 1;
    this.envelope = this.context.createBufferSource();
    this.buffer = this.context.createBuffer(
      1,
      this.context.sampleRate,
      this.context.sampleRate
    );
    this.buffData = this.buffer.getChannelData(0);
    for (let i = 0; i < this.context.sampleRate; i++) {
      this.buffData[i] = 0;
    }
    this.envelope.buffer = this.buffer;
    this.envelope.connect(this.adder);
    this.sustain.connect(this.adder);
    this.adder.connect(this.outNode.gain);

    let now = this.context.currentTime;
    this.sustain.start(now);
    this.envelope.start(now);

    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
  }

  set curve(newCurve) {
    let buffData = this.buffer.getChannelData(0);
    for (let i = 0; i < this.context.sampleRate; i++) {
      if ((newCurve.startSampleId < i) & (i < newCurve.endSampleId)) {
        buffData[i] = newCurve.arr[i] - newCurve.sustainAmp;
      } else {
        buffData[i] = 0;
      }
    }
    this.sustain.offset.value = newCurve.sustainAmp;
  }

  set loop(toLoop) {
    this.envelope.loop = toLoop;
    this.options.loop = toLoop;
  }

  set dur(seconds) {
    this.envelope.playbackRate.value = 1 / seconds;
    this.options.dur = seconds;
  }
}

export default ScEnvelope;
