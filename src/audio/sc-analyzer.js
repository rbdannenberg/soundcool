class ScAnalyzer {

    constructor(context, options={}) {
        this.context = context;
        let defOpts;
        defOpts = {
            'fftSize' : 2048,
            'type' : 'frequency',
            'arraySize' : 256
        };
        this.options = Object.assign(defOpts, options);
        this.setupNodes();
    }

    setupNodes() {
        this.analyzer = this.context.createAnalyser();
        this.inNode = this.analyzer;
        switch (this.options.type) {
            case 'waveform':
                this.array = new Uint8Array(this.options.arraySize);
                this.getData = function() {
                    this.analyzer.getByteTimeDomainData(this.array);
                    return this.array;
                };
                break;
            case 'frequency':
                this.analyzer.fftSize = this.options.fftSize;
                this.array = new Float32Array(this.analyzer.frequencyBinCount);
                this.getData = function() {
                    this.analyzer.getFloatFrequencyData(this.array);
                    return this.array;
                };
                break;
        }
    }

}

export default ScAnalyzer;
