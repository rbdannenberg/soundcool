import ScModule from  './sc-module.js';
import ScCrossFade from './sc-crossfade-piecewise.js';
import ScPhasor from './sc-phasor.js';
import WaveTableOscillator from './sc-wavetable-osc.js';

class ScPitch extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {
            'pitch' : 0,
            'grainSize' : 0.1
        };
        this.options = Object.assign(defOpts, options);
        this.setupNodes();
    }

    gainCurve(buffLen=4096) {
        var buffer = new Float32Array(buffLen);
        let x;
        for (let i=0; i<buffLen; i++) {
            x = 2 * (i / (buffLen - 1)) - 1;
            buffer[i] = (x + 1) / 2;
        }
        return buffer;
    }

    setupNodes() {
        this.inNode1 = this.context.createDelay(1);
        this.inNode2 = this.context.createDelay(1);
        this.outNode = this.context.createGain();
        this.frequency = this.context.createConstantSource();
        this.frequency.start(0);
        this.frequency.offset.value = 0;
        let gCurve = this.gainCurve();
        this.lfo1 = new ScPhasor(this.context, {rampStart : 0.});
        this.lfo1Mul = this.context.createGain();
        this.lfo1Mul.gain.value = this.options.winSize;
        this.lfo1Add = this.context.createConstantSource();
        this.lfo1Add.start(0);
        this.lfo1Add.offset.value = 0;
        this.lfo1Out = this.context.createGain();
        //this.scale1 = this.context.createWaveShaper();
        //this.scale1.curve = gCurve;
        //this.lfo1.outNode.connect(this.scale1);
        //this.scale1.connect(this.lfo1Mul);
        this.lfo1.outNode.connect(this.lfo1Mul);
        this.lfo1Mul.connect(this.lfo1Out);
        this.lfo1Add.connect(this.lfo1Out);
        this.lfo2 = new ScPhasor(this.context, {rampStart : 0.5});
        this.lfo2Mul = this.context.createGain();
        this.lfo2Mul.gain.value = this.options.winSize;
        this.lfo2Add = this.context.createConstantSource();
        this.lfo2Add.start(0);
        this.lfo2Add.offset.value = 0;
        this.lfo2Out = this.context.createGain();
        //this.scale2 = this.context.createWaveShaper();
        //this.scale2.curve = gCurve;
        //this.lfo2.outNode.connect(this.scale2);
        //this.scale2.connect(this.lfo2Mul);
        this.lfo2.outNode.connect(this.lfo2Mul);
        this.lfo2Mul.connect(this.lfo2Out);
        this.lfo2Add.connect(this.lfo2Out);
        this.clfo = new WaveTableOscillator(this.context, {
                            'type' : 'triangle',
                            'phase': 90
                        });
        this.scale3 = this.context.createWaveShaper();
        this.scale3.curve = gCurve;
        this.clfo.outNode.connect(this.scale3);

        this.inNode1.delayTime.cancelScheduledValues(0);
        this.inNode1.delayTime.setValueAtTime(0, 0);
        this.inNode2.delayTime.cancelScheduledValues(0);
        this.inNode2.delayTime.setValueAtTime(0, 0);
        this.lfo1Out.connect(this.inNode1.delayTime);
        this.lfo2Out.connect(this.inNode2.delayTime);

        this.crossfade = new ScCrossFade(this.context);
        this.crossfade.fader.offset.cancelScheduledValues(0);
        this.crossfade.fader.offset.setValueAtTime(0, 0);
        this.scale3.connect(this.crossfade.fader.offset);

        this.inNode1.connect(this.crossfade.inNode1);
        this.inNode2.connect(this.crossfade.inNode2);
        this.lfo1.node.playbackRate.cancelScheduledValues(0);
        this.lfo1.node.playbackRate.setValueAtTime(0, 0);
        this.lfo2.node.playbackRate.cancelScheduledValues(0);
        this.lfo2.node.playbackRate.setValueAtTime(0, 0);
        this.clfo.osc.frequency.cancelScheduledValues(0);
        this.clfo.osc.frequency.setValueAtTime(0, 0);
        this.frequency.connect(this.lfo1.node.playbackRate);
        this.frequency.connect(this.lfo2.node.playbackRate);
        this.frequency.connect(this.clfo.osc.frequency);
        this.crossfade.outNode.connect(this.outNode);

        // start LFO at same time
        let currentTime = this.context.currentTime;
        this.lfo1.node.start(currentTime);
        this.lfo2.node.start(currentTime);
        this.clfo.osc.start(currentTime);

        this.grainSize = this.options.grainSize;
    }

    set pitch(cents) {
        let interval = cents / 100;
        let ratio = Math.pow(2, (interval/12));
        let slope = 1.2 * Math.abs(1 - ratio) / this.frequency.offset.value;
        console.log('slope: ', slope);
        if (interval < 0) {
            this.lfo1Mul.gain.value = slope;
            this.lfo1Add.offset.value = 0;
            this.lfo2Mul.gain.value = slope;
            this.lfo2Add.offset.value = 0;

        } else {
            this.lfo1Mul.gain.value = -slope;
            this.lfo1Add.offset.value = slope;
            this.lfo2Mul.gain.value = -slope;
            this.lfo2Add.offset.value = slope;
        }
        this.options.pitch = cents;
    }

    set grainSize(seconds) {
        let frequency = 1 / seconds;
        this.frequency.offset.value = frequency;
        console.log('saw frequency: ', frequency);
        this.options.grainSize = seconds;
        this.pitch = this.options.pitch;
    }

}

export default ScPitch;
