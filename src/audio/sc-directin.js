import ScModule from './sc-module.js';

function connectStream(stream) {
    this.inNode = this.context.createMediaStreamSource(stream);
    this.outNode = this.context.createGain();
    this.inNode.connect(this.outNode);

    this.connPromise.resolve();
}

function connectError(error) {
    console.error('ScDirectIn: '+error.message);
    this.connPromise.reject();
}

class ScDirectIn extends ScModule {

    constructor(context) {
        super(context);
        this.connectStream = connectStream.bind(this);
        this.connectError = connectError.bind(this);
        this.setupNodes();
    }

    setupNodes() {
        navigator.mediaDevices.getUserMedia({audio: {channelCount: 2}})
            .then(this.connectStream)
            .catch(this.connectError);
    }
}


export default ScDirectIn;
