import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

class ScSpeakers extends ScModule {
  constructor(context, options = {}) {
    super(context);

    let defOpts = {
      suspended: false
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  setupNodes() {
    this.inNode = this.outNode = this.context.createGain();
    this.dest = this.context.destination;
    this.splitter = new ChannelSplitterNode(this.context, {
      numberOfOutputs: 2
    });
    this.analyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.analyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.inNode.connect(this.splitter);
    this.inNode.connect(this.dest);
    this.splitter.connect(this.analyzerL.inNode, 0);
    this.splitter.connect(this.analyzerR.inNode, 1);

    this.inputs.push(this.inNode);
    this.outputs.push(this.inNode);
    this.suspended = this.options.suspended;
  }

  destroy() {
    this.inNode.disconnect(this.splitter);
    this.inNode.disconnect(this.dest);
    this.splitter.disconnect(this.analyzerL.inNode, 0);
    this.splitter.disconnect(this.analyzerR.inNode, 1);
  }

  getAudioData() {
    let dataL = this.analyzerL.getData();
    let dataR = this.analyzerR.getData();
    return [dataL, dataR];
  }

  set suspended(value) {
    this.options.suspended = value;
    if (this.context.state === 'running' && this.options.suspended) {
      this.volume = 0;
      setTimeout(() => {
        this.context.suspend();
      }, 250);
    } else if (this.context.state === 'suspended' && !this.options.suspended){
      this.context.resume();
      this.volume = 100;
    }
  }
}

export default ScSpeakers;
