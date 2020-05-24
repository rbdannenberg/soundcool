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
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode0.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node0Gain = value;
  }

  set node1Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode1.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node1Gain = value;
  }

  set node2Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode2.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node2Gain = value;
  }

  set node3Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode3.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node3Gain = value;
  }

  set node4Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode4.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node4Gain = value;
  }

  set node5Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode5.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node5Gain = value;
  }

  set node6Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode6.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node6Gain = value;
  }

  set node7Gain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.inNode7.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.node7Gain = value;
  }

  set masterGain(value) {
    value = Math.max(parseFloat(value), 1.40130e-45);
    this.outNode.gain.exponentialRampToValueAtTime(value,
      this.context.currentTime + 0.5);
    this.options.masterGain = value;
  }

  getMasterAudioData() {
    let dataL = this.masterAnalyzerL.getData();
    let dataR = this.masterAnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode0AudioData() {
    let dataL = this.node0AnalyzerL.getData();
    let dataR = this.node0AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode1AudioData() {
    let dataL = this.node1AnalyzerL.getData();
    let dataR = this.node1AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode2AudioData() {
    let dataL = this.node2AnalyzerL.getData();
    let dataR = this.node2AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode3AudioData() {
    let dataL = this.node3AnalyzerL.getData();
    let dataR = this.node3AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode4AudioData() {
    let dataL = this.node4AnalyzerL.getData();
    let dataR = this.node4AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode5AudioData() {
    let dataL = this.node5AnalyzerL.getData();
    let dataR = this.node5AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode6AudioData() {
    let dataL = this.node6AnalyzerL.getData();
    let dataR = this.node6AnalyzerR.getData();
    return [dataL, dataR];
  }

  getNode7AudioData() {
    let dataL = this.node7AnalyzerL.getData();
    let dataR = this.node7AnalyzerR.getData();
    return [dataL, dataR];
  }
}

export default ScMixer;
