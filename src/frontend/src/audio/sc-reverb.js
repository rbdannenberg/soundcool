import ScModule from "./sc-module.js";
import ScCrossFade from "./sc-crossfade.js";
import { fetchPreset } from "./actions.js";

class ScReverb extends ScModule {
  constructor(context, options = {}) {
    super(context);

    let defOpts = {
      preset: "1",
      mix: 0.5,
      bypass: false
    };
    this.options = Object.assign(defOpts, options);
    this.irBuffers = {};
    this.setupNodes();
    this.loadPreset();
    this.bypass = this.options.bypass;
  }

  requestIRBuffer(presetId) {
    let loadPromise = new Promise(
      function(resolve, reject) {
        fetchPreset(presetId).then(data => {
          let arrayBuffer = new Uint8Array(data["data"]).buffer;
          this.context.decodeAudioData(
            arrayBuffer,
            function(buffer) {
              this.irBuffers[presetId] = buffer; //presetId is unique

              // Only for debugging purpose
              // Uncomment to hear the preset when it's loaded
              // let source = this.context.createBufferSource();
              // source.buffer = this.irBuffers[presetId];
              // source.connect(this.context.destination);
              // source.start();

              resolve();
            }.bind(this),
            function(error) {
              console.error("ScReverb: " + error.message);
              reject(error);
            }
          );
        });
      }.bind(this)
    );
    return loadPromise;
  }

  async loadPreset(presetId = 1) {
    // By default load preset which is pre-defined
    let promises = [];
    console.log("ScReverb: loading " + presetId);
    let prom = this.requestIRBuffer(presetId);
    promises.push(prom);
    await Promise.all(promises).catch(function(error) {
      console.error("ScReverb: Error loading IR buffer(s)");
    });
    this.preset = this.options.preset;
  }

  setupNodes() {
    this.mixNode = new ScCrossFade(this.context, {
      fadeValue: this.options.mix
    });
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
