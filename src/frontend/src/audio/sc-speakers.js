import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

class ScSpeakers extends ScModule {
  constructor(context, options = {}) {
    super(context);

    let defOpts = {
      muted: false
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  setupNodes() {
    this.inNode = this.context.createGain();
    this.outNode = this.context.destination;
    this.splitter = new ChannelSplitterNode(this.context, {
      numberOfOutputs: 2
    });
    this.analyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.analyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.inNode.connect(this.splitter);
    this.inNode.connect(this.outNode);
    this.splitter.connect(this.analyzerL.inNode, 0);
    this.splitter.connect(this.analyzerR.inNode, 1);

    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
    if (this.options.muted) {
      this.inNode.gain.value = 0;
    }
  }

  destroy() {
    this.inNode.disconnect(this.splitter);
    this.inNode.disconnect(this.outNode);
    this.splitter.disconnect(this.analyzerL.inNode, 0);
    this.splitter.disconnect(this.analyzerR.inNode, 1);
  }

  getAudioData() {
    let dataL = this.analyzerL.getData();
    let dataR = this.analyzerR.getData();
    return [dataL, dataR];
  }

  set muted(value) {
    console.log("changing muted");
    this.options.muted = value;
    if (this.options.muted) {
      this.inNode.gain.value = 0;
    } else {
      this.inNode.gain.value = 1;
    }
  }
}

export default ScSpeakers;
