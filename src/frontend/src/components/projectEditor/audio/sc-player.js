import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

function loadBufferSuccess(buffer) {
  this.buffer = buffer;
  this.duration = this.buffer.duration;
  this.bufferChannels = this.buffer.numberOfChannels;
  this.loadPromise.resolve(this.duration);
}

function loadBufferError(error) {
  console.error("ScPlayer: " + error.message);
  this.loadPromise.reject();
}

class ScPlayer extends ScModule {

  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      path: "",
      loop: false,
      speed: 1.0,
      reverse: false
    };
    this.offset = 0;
    this.options = Object.assign(defOpts, options);
    this.loadBufferSuccess = loadBufferSuccess.bind(this);
    this.loadBufferError = loadBufferError.bind(this);
    this.startTime = null;
    this.setupNodes();
  }

  setupNodes() {
    this.inNode = this.context.createBufferSource();
    this.outNode = this.context.createGain();
    this.analyzer = new ScAnalyzer(this.context, { type: "level" });

    this.inNode.connect(this.outNode);
    this.outNode.connect(this.analyzer.inNode);
    this.outputs.push(this.outNode);
  }


  load(path) {
    this.offset = 0;
    this.startTime = null;
    this.isPlaying = false;
    this.options.path = path;
    let res, rej;
    this.loadPromise = new Promise(function(resolve, reject) {
      res = resolve;
      rej = reject;
    });
    this.loadPromise.resolve = res;
    this.loadPromise.reject = rej;
    let request = new XMLHttpRequest();
    request.open("GET", this.options.path, true);
    request.responseType = "arraybuffer";
    request.onload = function(progressEvent) {
      this.context.decodeAudioData(
        progressEvent.target.response,
        this.loadBufferSuccess,
        this.loadBufferError
      );
    }.bind(this);
    request.send();
    return this.loadPromise;
  }

  play(playbackEndCallback) {
    if (this.inNode !== undefined) {
      this.inNode.disconnect(this.outNode);
      this.inNode.onended = null;
      this.inNode = null;
    }
    this.inNode = this.context.createBufferSource();
    this.inNode.buffer = this.buffer;
    this.inNode.connect(this.outNode);
    this.inNode.loop = this.options.loop;
    this.inNode.playbackRate.value = this.options.speed;
    this.inNode.start(0, this.offset);
    this.startTime =
      this.context.currentTime - this.offset / this.options.speed;
    this.isPlaying = true;
    this.isPaused = false;
    this.inNode.onended = function(event) {
      if (this.isPlaying) this.stop();
      if (playbackEndCallback) playbackEndCallback();
    }.bind(this);
  }

  stop(resetOffset = true) {
    this.isPlaying = false;
    if (this.startTime !== null) {
      this.inNode.stop();
    }
    if (resetOffset) {
      this.offset = 0;
    }
  }

  pause() {
    this.isPaused = true;
    this.offset =
      (this.options.speed * (this.context.currentTime - this.startTime)) %
      this.duration;
    this.stop(false);
  }

  seek(seekPosition) {
    this.pause();
    seekPosition = parseFloat(seekPosition);
    this.offset = this.duration * seekPosition;
    if (this.options.reverse) {
      this.offset = this.duration - this.offset;
    }
    this.play();
  }

  reverse() {
    let wasPlaying = this.isPlaying;
    let isNotAtStart = this.isPlaying || (!this.isPlaying && this.isPaused);
    if (this.isPlaying) this.pause();
    for (let i = 0; i < this.bufferChannels; i++) {
      this.buffer.getChannelData(i).reverse();
    }
    this.options.reverse = !this.options.reverse;
    if (isNotAtStart) {
      this.offset = this.duration - this.offset;
    }
    if (wasPlaying) {
      this.play();
    }
  }

  set speed(value) {
    value = parseFloat(value);
    let currTime = this.context.currentTime;
    if (this.startTime !== null) {
      let currPosition =
        (currTime - this.startTime) % (this.duration / this.options.speed);
      let posNewSpeed =
        ((this.duration / value) * currPosition) /
        (this.duration / this.options.speed);
      this.startTime = currTime - posNewSpeed;
    }
    this.options.speed = value;
    this.inNode.playbackRate.value = value;
  }

  set loop(value) {
    this.inNode.loop = value;
    this.options.loop = value;
  }

  getAudioData() {
    let data = this.analyzer.getData();
    return [data];
  }
}

export default ScPlayer;
