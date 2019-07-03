import ScModule from './sc-module.js';

function createBuffer(buffer) {
    this.inNode = this.context.createBufferSource();
    this.outNode = this.context.createGain();
    this.inNode.loop = this.options.loop;
    this.inNode.playbackRate.value = this.options.speed;
    this.inNode.buffer = buffer;
    if (this.options.reverse) {
        this.reverse();
        this.options.reverse = true;
    }
    this.inNode.connect(this.outNode);
    this.connPromise.resolve();
}

function createBufferError(error) {
    console.error('ScPlayer: '+error.message);
    this.connPromise.reject();
}

class ScPlayer extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {'path':'',
                       'loop':false,
                       'speed':1.0,
                       'reverse':false};
        this.options = Object.assign(defOpts, options);
        this.createBuffer = createBuffer.bind(this);
        this.createBufferError = createBufferError.bind(this);
        this.setupNodes();
    }

    setupNodes() {
        let request = new XMLHttpRequest();
        request.open('GET', this.options.path, true);
        request.responseType = 'arraybuffer';
        request.onload = function(progressEvent){
            this.context.decodeAudioData(progressEvent.target.response,
                this.createBuffer,
                this.createBufferError)
        }.bind(this);
        request.send();
    }

    start() {
        this.inNode.start(0);
    }

    stop() {
        this.inNode.stop();
    }

    reverse() {
        this.inNode.buffer.getChannelData(0).reverse();
        this.inNode.buffer.getChannelData(1).reverse();
        this.options.reverse = !this.options.reverse;
    }

    set speed(value) {
        value = parseFloat(value);
        this.options.speed = value;
        this.inNode.playbackRate.value = value;
    }
}

export default ScPlayer;
