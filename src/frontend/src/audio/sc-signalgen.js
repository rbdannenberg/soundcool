import ScModule from "./sc-module.js";
import ScOscillator from "./sc-oscillator.js";

class ScSignalGen extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      waveform: "Silence",
      frequency: 440,
      modulation: "No Mod",
      modParam: 1.0,
      volume: 100,
      LOWEST_FREQUENCY: 40,
      HIGHEST_FREQUENCY: 10000
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
    this.start();
  }

  setupNodes() {
    this.gainNode = this.context.createGain();
    this.inNode = this.mod = this.context.createGain();
    this.carr = new ScOscillator(this.context, this.options);
    this.outNode = this.context.createGain();
    this.modParamNode = this.context.createConstantSource();
    this.modParamNode.start();

    this.connectNodes();
    this.volume = this.options.volume;

    this.waveform = this.options.waveform;
    this.frequency = parseInt(this.options.frequency);
    this.modParam = parseFloat(this.options.modParam);

    this.inputs.push(this.inNode);
    this.outputs.push(this.outNode);
  }

  connectNodes() {
    switch (this.options.modulation) {
      case "RM":
        this.carr.connect(this.gainNode);
        this.mod.connect(this.gainNode.gain);
        this.gainNode.connect(this.outNode);
        break;
      case "AM":
        this.modParamNode.connect(this.mod.gain);
        this.carr.connect(this.gainNode);
        this.mod.connect(this.gainNode.gain);
        this.gainNode.connect(this.outNode);
        this.carr.connect(this.outNode);
        break;
      case "FM":
        this.modParamNode.connect(this.mod.gain);
        this.mod.connect(this.carr.inNode.frequency);
        this.carr.connect(this.outNode);
        break;
      case "No Mod":
        this.carr.connect(this.outNode);
        break;
      default:
        console.log("Invalid option");
    }
  }

  disconnectNodes() {
    switch (this.options.modulation) {
      case "RM":
        this.carr.disconnect(this.gainNode);
        this.mod.disconnect(this.gainNode.gain);
        this.gainNode.disconnect(this.outNode);
        break;
      case "AM":
        this.modParamNode.disconnect(this.mod.gain);
        this.carr.disconnect(this.gainNode);
        this.mod.disconnect(this.gainNode.gain);
        this.gainNode.disconnect(this.outNode);
        this.carr.disconnect(this.outNode);
        break;
      case "FM":
        this.modParamNode.disconnect(this.mod.gain);
        this.mod.disconnect(this.carr.frequency);
        this.carr.disconnect(this.outNode);
        break;
      case "No Mod":
        this.carr.disconnect(this.outNode);
        break;
      default:
        console.log("Invalid option");
    }
  }

  set modulation(modNew) {
    this.disconnectNodes();
    this.options.modulation = modNew;
    this.connectNodes();
  }

  start() {
    //this.carr.start();
  }

  stop() {
    this.carr.stop();
  }

  computeExpScaleFactor(value) {
    if (value >= this.options.LOWEST_FREQUENCY &&
      value <= this.options.HIGHEST_FREQUENCY) {
      //value -= this.options.LOWEST_FREQUENCY;
      value /= (this.options.HIGHEST_FREQUENCY - this.options.LOWEST_FREQUENCY);
      value = this.linearToExp(value);
      return value;
    } else {
      return 1.0;
    }
  }

  set frequency(value) {
    value = parseFloat(value);
    this.options.frequency = value;
    let scaleFactor = this.computeExpScaleFactor(value);
    console.log('multiplier=', scaleFactor);
    this.carr.frequency = value * scaleFactor;
  }

  set waveform(type) {
    this.options.waveform = type;
    this.carr.waveform = type;
  }

  set modParam(value) {
    value = parseFloat(value);
    this.options.modParam = value;
    this.modParamNode.offset.value = value;
  }

  set MI(value) {
    this.modParam = value;
  }

  set FD(value) {
    this.modParam = value;
  }
}

export default ScSignalGen;
