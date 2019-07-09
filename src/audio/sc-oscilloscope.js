import ScModule from './sc-module.js';
import ScAnalyzer from './sc-analyzer.js';

class ScOscilloscope extends ScModule {

    constructor(context) {
        super(context);
        this.options = {
            'type' : 'waveform',
            'arraySize' : 256,
            'renderRate' : 100
        };
        this.setupNodes();
    }

    setupNodes() {
        this.analyzerNode = new ScAnalyzer(this.context, this.options);
        this.inNode = this.analyzerNode.inNode;
    }

    getAudioData() {
        return this.analyzerNode.getData();
    }

    bindToCanvas(renderCtx) {
        this.renderCtx = renderCtx;
        this.renderer = setInterval(this.render.bind(this),
                            this.options.renderRate);
    }

    unbindCanvas() {
        let W = this.renderCtx.canvas.width;
        let H = this.renderCtx.canvas.height;
        this.renderCtx.clearRect(0,0,W,H);
        clearInterval(this.renderer);
    }

    render() {
        let renderCtx = this.renderCtx;
        let data = this.getAudioData();
        let length = data.length;
        let W = renderCtx.canvas.width;
        let H = renderCtx.canvas.height;
        let scaleY = function (y) {
            return (y / 128.0) * (H / 2);
        }
        renderCtx.clearRect(0,0,W,H);
        renderCtx.beginPath();
        renderCtx.strokeStyle = "rgba(0,255,0,0.8)";
        renderCtx.moveTo(0, scaleY(data[0]));
        for (let i = 0; i < length; ++i) {
            renderCtx.lineTo(W*i/length, scaleY(data[i]));
        }
        renderCtx.stroke();
    }
}

export default ScOscilloscope;
