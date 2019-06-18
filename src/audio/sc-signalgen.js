import ScModule from './sc-module.js';

class ScSignalGen extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {'waveType':'sine',
                       'freq':440,
                       'mod':'None',
                       'mi':1.0};
        this.options = Object.assign(defOpts, options);
        this.setupNodes();
    }

    setupNodes() {
        this.gainNode = this.context.createGain();
        this.inNode = this.mod = this.context.createGain();
        this.carr = this.context.createOscillator();
        this.outNode = this.context.createGain();
        switch(this.options.mod) {
            case 'RM':
                this.carr.connect(this.gainNode);
                this.mod.connect(this.gainNode.gain);
                this.gainNode.connect(this.outNode);
                break;
            case 'AM':
                this.carr.connect(this.gainNode);
                this.mod.connect(this.gainNode.gain);
                this.gainNode.connect(this.outNode);
                this.carr.connect(this.outNode);
                break;
            case 'FM':
                this.mod.connect(this.carr.frequency);
                this.carr.connect(this.outNode);
                break;
            case 'None':
                this.carr.connect(this.outNode);
                break;
        }
        this.waveType = this.options.waveType;
        this.freq = parseInt(this.options.freq);
        this.modGain = parseFloat(this.options.mi);
    }

    start() {
        this.carr.start();
    }

    stop() {
        this.carr.stop();
    }

    set freq(value) {
        value = parseFloat(value);
        this.options.freq = value;
        this.carr.frequency.value = value;
    }

    set waveType(type) {
        this.options.waveType = type;
        this.carr.type = type;
    }

    set modGain(value) {
        value = parseFloat(value);
        this.options.mi = value;
        this.mod.gain.value = value;
    }
}

export default ScSignalGen;
