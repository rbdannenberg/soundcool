import ScModule from "./sc-module.js";

function connectStream(stream) {
  this.inNode = this.context.createMediaStreamSource(stream);
  this.outNode = this.context.createGain();
  this.inNode.connect(this.outNode);

  this.inputs.push(this.inNode);
  this.outputs.push(this.outNode);
}

function connectError(error) {
  console.error("ScDirectIn: " + error.message);
}

class ScDirectIn extends ScModule {
  constructor(context) {
    super(context);
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
}

export default ScDirectIn;
