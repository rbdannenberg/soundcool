import ScModule from "./sc-module.js";

class ScReverb extends ScModule {

  constructor(context, options={}) {
    super(context);
    let defOpts = {
      'preset' : 'theatre',
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
        console.log('ScReverb: loading '+this.irPaths[buffKey]);
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
    this.inNode = this.context.createGain();
    this.outNode = this.context.createGain();
    this.convolver = this.context.createConvolver();
    this.inNode.connect(this.convolver);
    this.convolver.connect(this.outNode);
    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
  }

  set preset(buffKey) {
    this.convolver.buffer = this.irBuffers[buffKey];
    this.options.preset = buffKey;
  }
}

export default ScReverb;
