import ScModule from './sc-module.js';

class ScSpeakers extends ScModule {

    constructor(context) {
        super(context);
        this.setupNodes();
    }

    setupNodes() {
        this.inNode = this.context.createGain();
        this.outNode = this.context.destination;

        this.inNode.connect(this.outNode);
    }
}

export default ScSpeakers;
