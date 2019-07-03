import ScModule from './sc-module.js';

class ScDelay extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {'delayTime':0.1, 'feedback':0.3};
        this.options = Object.assign(defOpts, options);
        this.setupNodes();
    }

    setupNodes() {
        this.inNode = this.context.createGain();
        this.outNode = this.context.createGain();
        this.delayNode = this.context.createDelay();
        this.delayGain = this.context.createGain();

        this.inNode.connect(this.delayNode);
        this.delayNode.connect(this.delayGain);
        this.delayGain.connect(this.delayNode);
        this.delayNode.connect(this.outNode);

        this.delayNode.delayTime.value = this.options.delayTime;
        this.delayGain.gain.value = this.options.feedback;
    }

    set delayFeedback(val) {
        this.options.feedback = val;
        this.delayGain.gain.value = val;
    }

    set delayTime(val) {
        this.options.delayTime = val;
        this.delayNode.delayTime.value = val;
    }
}


export default ScDelay;
