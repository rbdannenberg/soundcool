import ScModule from "./sc-module.js";

function connectStream(stream) {
  this.inNode = this.context.createMediaStreamSource(stream);
  this.outNode = this.context.createGain();
  this.inNode.connect(this.outNode);

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
      muted: false
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
  set muted(value) {
    console.log("changing muted");
    this.options.muted = value;
    if (this.options.muted) {
      this.outNode.gain.value = 0;
    } else {
      this.outNode.gain.value = 1;
    }
  }
}

export default ScDirectIn;
