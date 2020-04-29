import ScModule from "./sc-module.js";
import ScAnalyzer from "./sc-analyzer.js";

class ScMixer extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      node0Gain: 0.7,
      node1Gain: 0.7,
      node2Gain: 0.7,
      node3Gain: 0.7,
      node4Gain: 0.7,
      node5Gain: 0.7,
      node6Gain: 0.7,
      node7Gain: 0.7,
      masterGain: 0.7
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  setupNodes() {
    this.masterAnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.masterAnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node0AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node0AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node1AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node1AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node2AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node2AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node3AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node3AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node4AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node4AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node5AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node5AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node6AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node6AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.node7AnalyzerL = new ScAnalyzer(this.context, { type: "level" });
    this.node7AnalyzerR = new ScAnalyzer(this.context, { type: "level" });
    this.inNode0 = this.context.createGain();
    this.inNode1 = this.context.createGain();
    this.inNode2 = this.context.createGain();
    this.inNode3 = this.context.createGain();
    this.inNode4 = this.context.createGain();
    this.inNode5 = this.context.createGain();
    this.inNode6 = this.context.createGain();
    this.inNode7 = this.context.createGain();
    this.outNode = this.context.createGain();
    this.splitter0 = this.context.createChannelSplitter(2);
    this.splitter1 = this.context.createChannelSplitter(2);
    this.splitter2 = this.context.createChannelSplitter(2);
    this.splitter3 = this.context.createChannelSplitter(2);
    this.splitter4 = this.context.createChannelSplitter(2);
    this.splitter5 = this.context.createChannelSplitter(2);
    this.splitter6 = this.context.createChannelSplitter(2);
    this.splitter7 = this.context.createChannelSplitter(2);
    this.masterSplitter = this.context.createChannelSplitter(2);

    this.inNode0.connect(this.splitter0);
    this.splitter0.connect(this.node0AnalyzerL.inNode, 0);
    this.splitter0.connect(this.node0AnalyzerR.inNode, 1);
    this.node0Gain = this.options.node0Gain;

    this.inNode1.connect(this.splitter1);
    this.splitter1.connect(this.node1AnalyzerL.inNode, 0);
    this.splitter1.connect(this.node1AnalyzerR.inNode, 1);
    this.node1Gain = this.options.node1Gain;

    this.inNode2.connect(this.splitter2);
    this.splitter2.connect(this.node2AnalyzerL.inNode, 0);
    this.splitter2.connect(this.node2AnalyzerR.inNode, 1);
    this.node2Gain = this.options.node2Gain;

    this.inNode3.connect(this.splitter3);
    this.splitter3.connect(this.node3AnalyzerL.inNode, 0);
    this.splitter3.connect(this.node3AnalyzerR.inNode, 1);
    this.node3Gain = this.options.node3Gain;

    this.inNode4.connect(this.splitter4);
    this.splitter4.connect(this.node4AnalyzerL.inNode, 0);
    this.splitter4.connect(this.node4AnalyzerR.inNode, 1);
    this.node4Gain = this.options.node4Gain;

    this.inNode5.connect(this.splitter5);
    this.splitter5.connect(this.node5AnalyzerL.inNode, 0);
    this.splitter5.connect(this.node5AnalyzerR.inNode, 1);
    this.node5Gain = this.options.node5Gain;

    this.inNode6.connect(this.splitter6);
    this.splitter6.connect(this.node6AnalyzerL.inNode, 0);
    this.splitter6.connect(this.node6AnalyzerR.inNode, 1);
    this.node6Gain = this.options.node6Gain;

    this.inNode7.connect(this.splitter7);
    this.splitter7.connect(this.node7AnalyzerL.inNode, 0);
    this.splitter7.connect(this.node7AnalyzerR.inNode, 1);
    this.node7Gain = this.options.node7Gain;

    this.outNode.connect(this.masterSplitter);
    this.masterSplitter.connect(this.masterAnalyzerL.inNode, 0);
    this.masterSplitter.connect(this.masterAnalyzerR.inNode, 1);
    this.masterGain = this.options.masterGain;

    this.inNode0.connect(this.outNode);
    this.inNode1.connect(this.outNode);
    this.inNode2.connect(this.outNode);
    this.inNode3.connect(this.outNode);
    this.inNode4.connect(this.outNode);
    this.inNode5.connect(this.outNode);
    this.inNode6.connect(this.outNode);
    this.inNode7.connect(this.outNode);
    this.inputs.push(this.inNode0);
    this.inputs.push(this.inNode1);
    this.inputs.push(this.inNode2);
    this.inputs.push(this.inNode3);
    this.inputs.push(this.inNode4);
    this.inputs.push(this.inNode5);
    this.inputs.push(this.inNode6);
    this.inputs.push(this.inNode7);
    this.outputs.push(this.outNode);
  }

  set node0Gain(value) {
    value = parseFloat(value);
    this.inNode0.gain.value = value;
    this.options.node0Gain = value;
  }

  set node1Gain(value) {
    value = parseFloat(value);
    this.inNode1.gain.value = value;
    this.options.node1Gain = value;
  }

  set node2Gain(value) {
    value = parseFloat(value);
    this.inNode2.gain.value = value;
    this.options.node2Gain = value;
  }

  set node3Gain(value) {
    value = parseFloat(value);
    this.inNode3.gain.value = value;
    this.options.node3Gain = value;
  }

  set node4Gain(value) {
    value = parseFloat(value);
    this.inNode4.gain.value = value;
    this.options.node4Gain = value;
  }

  set node5Gain(value) {
    value = parseFloat(value);
    this.inNode5.gain.value = value;
    this.options.node5Gain = value;
  }

  set node6Gain(value) {
    value = parseFloat(value);
    this.inNode6.gain.value = value;
    this.options.node6Gain = value;
  }

  set node7Gain(value) {
    value = parseFloat(value);
    this.inNode7.gain.value = value;
    this.options.node7Gain = value;
  }

  set masterGain(value) {
    value = parseFloat(value);
    this.outNode.gain.value = value;
    this.options.masterGain = value;
  }

  getMasterAudioData() {
    let data = this.masterAnalyzer.getData();
    return [data];
  }

  getNode0AudioData() {
    let data = this.node0Analyzer.getData();
    return [data];
  }

  getNode1AudioData() {
    let data = this.node1Analyzer.getData();
    return [data];
  }

  getNode2AudioData() {
    let data = this.node2Analyzer.getData();
    return [data];
  }

  getNode3AudioData() {
    let data = this.node3Analyzer.getData();
    return [data];
  }

  getNode4AudioData() {
    let data = this.node4Analyzer.getData();
    return [data];
  }

  getNode5AudioData() {
    let data = this.node5Analyzer.getData();
    return [data];
  }

  getNode6AudioData() {
    let data = this.node6Analyzer.getData();
    return [data];
  }

  getNode7AudioData() {
    let data = this.node7Analyzer.getData();
    return [data];
  }
}

export default ScMixer;
