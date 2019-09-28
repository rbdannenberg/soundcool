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

        this.inputs.push(this.inNode);
    }

    getAudioData() {
        return this.analyzerNode.getData();
    }

}

export default ScOscilloscope;
