import ScModule from "./sc-module.js";

function connectStream(stream) {
  this.inNode = this.context.createMediaStreamSource(stream);
  this.panner = this.context.createStereoPanner()
  this.pan = this.options.pan;
  this.outNode = this.context.createGain();
  this.panner.connect(this.outNode);
  this.inNode.connect(this.panner);

  this.inputs.push(this.inNode);
  this.outputs.push(this.outNode);
  if (this.options.muted) {
    this.outNode.gain.value = 0;
  }
}

function connectError(error) {
  console.error("ScDirectIn: " + error.message);
}

class ScDirectIn extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      muted: false,
      pan: 0
    };
    this.options = Object.assign(defOpts, options);
    this.connectStream = connectStream.bind(this);
    this.connectError = connectError.bind(this);
    this.setupNodes();
  }

  setupNodes() {
    navigator.mediaDevices
      .getUserMedia({ audio: { channelCount: 2 } })
      .then(this.connectStream)
      .catch(this.connectError);
  }

  set volume(value) {
    this.options.volume = value;
    if (!this.options.muted) {
      super.volume = value;
    }
  }

  set muted(value) {
    this.options.muted = value;
    if (this.options.muted) {
      super.volume = 0;
    } else {
      this.volume = this.options.volume;
    }
  }

  set pan(value) {
    value = parseFloat(value);
    this.options.pan = value;
    this.panner.pan.value = value;
  }
}

export default ScDirectIn;
