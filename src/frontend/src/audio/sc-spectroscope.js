import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

class ScSpectroscope extends ScModule {
  constructor(context) {
    super(context);
    this.options = {
      type: "frequency",
      renderRate: 10,
      fftSize: 512,
      fftCount: 30,
      history: false
    };
    this.setupNodes();
  }

  setupNodes() {
    this.analyzerNode = new ScAnalyzer(this.context, this.options);
    this.inNode = this.analyzerNode.inNode;

    this.inputs.push(this.inNode);
  }

  set history(value) {
    this.options.history = value;
  }

  getAudioData() {
    return this.analyzerNode.getData();
  }
}

export default ScSpectroscope;
