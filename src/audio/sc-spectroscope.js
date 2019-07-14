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

}

export default ScSpectroscope;
