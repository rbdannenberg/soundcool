import ScModule from "./sc-module.js";
import ScOscillator from "./sc-oscillator.js";

class ScSignalGen extends ScModule {
    constructor(context, options = {}) {
        super(context);
        let defOpts = {
            waveType: "Silence",
            freq: 440,
            mod: "No Mod",
            modParam: 1.0
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

        this.waveform = this.options.waveType;
        this.frequency = parseInt(this.options.freq);
        this.modParam = parseFloat(this.options.modParam);

        this.inputs.push(this.inNode);
        this.outputs.push(this.outNode);
    }

    connectNodes() {
        switch (this.options.mod) {
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
        switch (this.options.mod) {
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
        this.options.mod = modNew;
        this.connectNodes();
    }

    start() {
        //this.carr.start();
    }

    stop() {
        this.carr.stop();
    }

    set frequency(value) {
        value = parseFloat(value);
        this.options.freq = value;
        this.carr.frequency = value;
    }

    set waveform(type) {
        this.options.waveType = type;
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
