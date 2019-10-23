import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

class ScSpeakers extends ScModule {
    constructor(context) {
        super(context);
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
    }

    getAudioData() {
        let dataL = this.analyzerL.getData();
        let dataR = this.analyzerR.getData();
        return [dataL, dataR];
    }
}

export default ScSpeakers;
