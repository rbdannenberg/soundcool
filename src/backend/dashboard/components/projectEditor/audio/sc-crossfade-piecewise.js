class ScCrossFade {

    constructor(context, options={}) {
        let defOpts = {
            'fadeValue' : 0.2
        };
        this.options = Object.assign(defOpts, options);
        this.context = context;
        this.setupNodes();
    }

    makeEqualPowerCurveSine(buffLen=4096, fadeStart=0.25) {
        var buffer = new Float32Array(buffLen);
        let x;
        for (let i=0; i<buffLen; i++) {
            x = 2 * (i / (buffLen -1)) - 1;
            if (x < fadeStart) {
                buffer[i] = 0;
            } else if (x > 1 - fadeStart) {
                buffer[i] = 1;
            } else {
                buffer[i] = Math.sin(Math.PI * (x - fadeStart));
            }
        }
        return buffer;
    }

    makeEqualPowerCurveCos(buffLen=4096, fadeStart=0.25) {
        var buffer = new Float32Array(buffLen);
        let x;
        for (let i=0; i<buffLen; i++) {
            x = 2 * (i / (buffLen -1)) - 1;
            if (x < fadeStart) {
                buffer[i] = 1;
            } else if (x > 1 - fadeStart) {
                buffer[i] = 0;
            } else {
                buffer[i] = Math.cos(Math.PI * (x - fadeStart));
            }
        }
        return buffer;
    }

    setupNodes() {
        this.inNode1 = this.context.createGain();
        this.inNode2 = this.context.createGain();
        this.outNode = this.context.createGain();
        this.fader = this.context.createConstantSource();
        this.fader.start(0);
        this.eqPower1 = this.context.createWaveShaper();
        this.eqPower1.curve = this.makeEqualPowerCurveCos();
        this.eqPower2 = this.context.createWaveShaper();
        this.eqPower2.curve = this.makeEqualPowerCurveSine();
        /*
        this.one = this.context.createConstantSource();
        this.one.offset.value = 1;
        this.one.start(0);
        this.negate = this.context.createGain();
        this.negate.gain.value = -1;
        this.sum = this.context.createGain();
        */

        this.inNode1.connect(this.outNode);
        this.inNode2.connect(this.outNode);
        this.inNode2.gain.cancelScheduledValues(0);
        this.inNode2.gain.setValueAtTime(0,0);
        this.fader.connect(this.eqPower2);
        this.eqPower2.connect(this.inNode2.gain);
        //this.one.connect(this.sum);
        //this.fader.connect(this.negate);
        //this.negate.connect(this.sum);
        this.inNode1.gain.cancelScheduledValues(0);
        this.inNode1.gain.setValueAtTime(0,0);
        //this.sum.connect(this.eqPower1);
        this.fader.connect(this.eqPower1);
        this.eqPower1.connect(this.inNode1.gain);

        this.fadeValue = this.options.fadeValue;
    }

    set fadeValue(val) {
        val = parseFloat(val);
        this.options.fadeValue = val;
        this.fader.offset.value = val;
    }
}


export default ScCrossFade;
