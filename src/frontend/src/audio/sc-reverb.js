import ScModule from "./sc-module.js";
import ScCrossFade from "./sc-crossfade.js";

class ScReverb extends ScModule {

  constructor(context, options={}) {
    super(context);
    let defOpts = {
      'preset': 'theatre',
      'mix': 0.5,
      'bypass': false
    };
    this.options = Object.assign(defOpts, options);
    this.irPaths = {
      'tunnel': '../audio/NancyLakeTunnel.wav',
      'stairwell': '../audio/CCRMAStairwell.wav',
      'bridge': '../audio/EchoBridge.wav',
      'theatre': '../audio/MillsGreekTheater.wav'
    };
    this.irBuffers = {};
    this.setupNodes();
    this.loadPresets();
    this.bypass = this.options.bypass;
  }

  requestIRBuffer(path, buffKey) {
    let loadPromise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open("GET", path, true);
      request.responseType = "arraybuffer";
      request.onload = function(progressEvent) {
        this.context.decodeAudioData(
          progressEvent.target.response,
          function(buffer) {
            this.irBuffers[buffKey] = buffer;
            resolve();
          }.bind(this),
          function(error) {
            console.error("ScReverb: " + error.message);
            reject(error);
          }
        );
      }.bind(this);
      request.send();
    }.bind(this));
    return loadPromise;
  }

  async loadPresets() {
    let promises = [];
    for (let buffKey in this.irPaths) {
      if (this.irPaths.hasOwnProperty(buffKey)) {
        console.log('ScReverb: loading ' + this.irPaths[buffKey]);
        let prom = this.requestIRBuffer(this.irPaths[buffKey], buffKey);
        promises.push(prom);
      }
    }
    await Promise.all(promises).catch(function(error) {
      console.error('ScReverb: Error loading IR buffer(s)');
    });
    this.preset = this.options.preset;
  }

  setupNodes() {
    this.mixNode = new ScCrossFade(this.context,
                    {'fadeValue': this.options.mix});
    this.inNode = this.context.createGain();
    this.outNode = this.context.createGain();
    this.convolver = this.context.createConvolver();
    this.inNode.connect(this.convolver);
    this.inNode.connect(this.mixNode.inNode1);
    this.convolver.connect(this.mixNode.inNode2);
    this.mixNode.outNode.connect(this.outNode);
    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
  }

  set mix(value) {
    value = parseFloat(value);
    this.mixNode.fadeValue = value;
    this.options.mix = value;
  }

  set bypass(value) {
    if (value) {
      this.mixNode.fadeValue = 0;
    } else {
      this.mix = this.options.mix;
    }
    this.options.bypass = value;
  }

  set preset(buffKey) {
    this.convolver.buffer = this.irBuffers[buffKey];
    this.options.preset = buffKey;
  }
}

export default ScReverb;
