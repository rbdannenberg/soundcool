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
    this.inNode0 = this.context.createGain();
    this.node0Gain = this.options.node0Gain;
    this.inNode1 = this.context.createGain();
    this.node1Gain = this.options.node1Gain;
    this.inNode2 = this.context.createGain();
    this.node2Gain = this.options.node2Gain;
    this.inNode3 = this.context.createGain();
    this.node3Gain = this.options.node3Gain;
    this.inNode4 = this.context.createGain();
    this.node4Gain = this.options.node4Gain;
    this.inNode5 = this.context.createGain();
    this.node5Gain = this.options.node5Gain;
    this.inNode6 = this.context.createGain();
    this.node6Gain = this.options.node6Gain;
    this.inNode7 = this.context.createGain();
    this.node7Gain = this.options.node7Gain;
    this.outNode = this.context.createGain();
    this.masterGain = this.options.masterGain;
    this.masterAnalyzer = new ScAnalyzer(this.context, { type: "level" });
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
    this.outNode.connect(this.masterAnalyzer.inNode);
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
}

export default ScMixer;
