class ScAnalyzer {
  constructor(context, options = {}) {
    this.context = context;
    let defOpts;
    defOpts = {
      fftSize: 2048,
      type: "frequency",
      arraySize: 256,
      smoothing: 0.6
    };
    this.options = Object.assign(defOpts, options);
    this.setupNodes();
  }

  setupNodes() {
    this.analyzer = this.context.createAnalyser();
    this.inNode = this.analyzer;
    this.analyzer.smoothingTimeConstant = 0;
    switch (this.options.type) {
      case "waveform":
        this.array = new Uint8Array(this.options.arraySize);
        this.getData = function() {
          this.analyzer.getByteTimeDomainData(this.array);
          return this.array;
        };
        break;
      case "frequency":
        this.analyzer.fftSize = this.options.fftSize;
        this.array = new Float32Array(this.analyzer.frequencyBinCount);
        this.getData = function() {
          this.analyzer.getFloatFrequencyData(this.array);
          return this.array;
        };
        break;
      case "level":
        this.array = new Float32Array(this.options.arraySize);
        this.getData = function() {
          this.analyzer.getFloatTimeDomainData(this.array);
          let data = this.array;
          let sqSum = 0;
          for (let i = 0; i < data.length; i++) {
            sqSum += data[i] * data[i];
          }
          let rms = Math.sqrt(sqSum / data.length);
          //rms = Math.max(rms, this.options.smoothing);
          let db = 20 * (Math.log(rms) / Math.LN10);
          return db;
        };
        break;
      default:
        console.log("Invalid option type");
    }
  }
}

export default ScAnalyzer;
