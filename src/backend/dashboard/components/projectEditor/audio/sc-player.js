import ScModule from './sc-module.js';

function loadBufferSuccess(buffer) {
    this.buffer = buffer;
    this.duration = this.buffer.duration;
    this.bufferChannels = this.buffer.numberOfChannels;
    this.loadPromise.resolve(this.duration);
}

function loadBufferError(error) {
    console.error('ScPlayer: '+error.message);
    this.loadPromise.reject();
}

class ScPlayer extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {
            'path' : '',
            'loop' : false,
            'speed' : 1.0,
            'reverse' : false
        };
        this.offset = 0;
        this.options = Object.assign(defOpts, options);
        this.loadBufferSuccess = loadBufferSuccess.bind(this);
        this.loadBufferError = loadBufferSuccess.bind(this);
        this.setupNodes();
    }

    setupNodes() {
        this.inNode = this.context.createBufferSource();
        this.outNode = this.context.createGain();
        this.inNode.connect(this.outNode);

        this.outputs.push(this.outNode);
    }


    load(path) {
        this.offset = 0;
        this.options.path = path;
        let res, rej;
        this.loadPromise = new Promise(function(resolve, reject) {
            res = resolve;
            rej = reject;
        });
        this.loadPromise.resolve = res;
        this.loadPromise.reject = rej;
        let request = new XMLHttpRequest();
        request.open('GET', this.options.path, true);
        request.responseType = 'arraybuffer';
        request.onload = function(progressEvent) {
            this.context.decodeAudioData(progressEvent.target.response,
                this.loadBufferSuccess,
                this.loadBufferError)
        }.bind(this);
        request.send();
        return this.loadPromise;
    }

    play() {
        if (this.inNode !== undefined) {
            this.inNode.disconnect(this.outNode);
            this.inNode = null;
        }
        this.inNode = this.context.createBufferSource();
        this.inNode.buffer = this.buffer;
        this.inNode.connect(this.outNode);
        this.inNode.loop = this.options.loop;
        this.inNode.playbackRate.value = this.options.speed;
        this.inNode.start(0, this.offset);
        this.startTime = this.context.currentTime - this.offset;
    }

    stop(resetOffset=true) {
        this.inNode.stop();
        if (resetOffset) {
            this.offset = 0;
        }
    }


    pause() {
        this.offset = (this.context.currentTime - this.startTime) % (this.duration / this.options.speed);
        this.stop(false);
    }

    seek(seekPosition) {
        this.pause();
        let seekSeconds = seekPosition * (this.duration / this.options.speed);
        this.offset = seekSeconds;
        this.play();
    }

    reverse() {
        for (let i = 0; i < this.bufferChannels; i++){
            this.inNode.buffer.getChannelData(i).reverse();
        }
        this.options.reverse = !this.options.reverse;
    }

    set speed(value) {
        value = parseFloat(value);
        this.options.speed = value;
        this.inNode.playbackRate.value = value;
        //let offset = (this.context.currentTime - this.startTime) % this.duration;
        //this.startTime = this.context.currentTime - this.offset * value;
    }

    set loop(value) {
        this.inNode.loop = value;
        this.options.loop = value;
    }
}

export default ScPlayer;
