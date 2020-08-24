import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

function connectStream(stream) {
  this.micPermission = true;
  this.inNode = this.context.createMediaStreamSource(stream);
  this.panner = this.context.createStereoPanner()
  this.pan = this.options.pan;
  this.outNode = this.context.createGain();
  this.inNode.connect(this.panner);
  this.panner.connect(this.outNode);
  this.outNode.connect(this.analyzer.inNode);

  this.inputs.push(this.inNode);
  this.outputs.push(this.outNode);
  if (this.options.muted) {
    this.outNode.gain.value = 0;
  }
  this.setupPromise.resolve(this);
}

function connectError(error) {
  this.micPermission = false;
  console.error("ScDirectIn: " + error.message);
  this.setupPromise.reject(this);
}

class ScDirectIn extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      muted: false,
      pan: 0,
      volume: 100
    };
    this.options = Object.assign(defOpts, options);
    this.analyzer = new ScAnalyzer(this.context, { type : "level" });
    this.connectStream = connectStream.bind(this);
    this.connectError = connectError.bind(this);
    return this.setupNodes();
  }

  setupNodes() {
    let res, rej;
    this.setupPromise = new Promise(function(resolve, reject) {
      res = resolve;
      rej = reject;
    });
    this.setupPromise.resolve = res;
    this.setupPromise.reject = rej;
    navigator.mediaDevices
      .getUserMedia({ audio: { channelCount: 2 } })
      .then(this.connectStream)
      .catch(this.connectError);
    return this.setupPromise;
  }

  getAudioData() {
    return this.analyzer.getData();
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
