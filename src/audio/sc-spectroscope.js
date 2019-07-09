import ScModule from './sc-module.js';
import ScAnalyzer from './sc-analyzer.js';

class ScSpectroscope extends ScModule {

    constructor(context) {
        super(context);
        this.options = {
            'type' : 'frequency',
            'renderRate' : 100,
            'fftSize' : 2048
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
        let fftSize = this.options.fftSize;
        let W = renderCtx.canvas.width;
        let H = renderCtx.canvas.height;
        let minDb = this.analyzerNode.analyzer.minDecibels;
        let maxDb = this.analyzerNode.analyzer.maxDecibels;
        let scaleY = function (y) {
            y = (y-minDb)/(maxDb-minDb);
            return (1-y) * H;
        }
        renderCtx.clearRect(0,0,W,H);
        renderCtx.beginPath();
        renderCtx.fillStyle = 'rgba(0,0,0,.4)';
        renderCtx.moveTo(0, H);
        let range = fftSize
        for (let i = 0; i <= fftSize; i++) {
            renderCtx.lineTo(i, scaleY(data[i]));
        }
        renderCtx.lineTo(W, H);
        renderCtx.fill();
    }
}

export default ScSpectroscope;
