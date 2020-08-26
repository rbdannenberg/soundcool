class WaveTableOscillator {
  constructor(context, options) {
    let defOpts = {
      type: "sawtooth",
      phase: 0
    };
    this.context = context;
    this.osc = this.context.createOscillator();
    this.options = Object.assign(defOpts, options);
    let table = this.computeWaveTable(this.options.type, this.options.phase);
    let wave = this.context.createPeriodicWave(table[0], table[1]);
    this.osc.setPeriodicWave(wave);
    this.outNode = this.context.createGain();
    this.osc.connect(this.outNode);
  }

  destroy() {
    this.osc.disconnect(this.outNode);
    this.osc.stop();
  }

  computeWaveTable(type, phase) {
    phase = (parseFloat(phase) * Math.PI) / 180;
    let periodicWaveSize = 4096;
    let real = new Float32Array(periodicWaveSize);
    let imag = new Float32Array(periodicWaveSize);
    this._partialCount = 0;
    this._partials = [];
    let partialCount = 0;
    for (let n = 1; n < periodicWaveSize; ++n) {
      let piFactor = 2 / (n * Math.PI);
      let b;
      switch (type) {
        case "sine":
          b = n <= partialCount ? 1 : 0;
          this._partials[n - 1] = b;
          break;
        case "square":
          b = n & 1 ? 2 * piFactor : 0;
          this._partials[n - 1] = b;
          break;
        case "sawtooth":
          b = piFactor * (n & 1 ? 1 : -1);
          this._partials[n - 1] = b;
          break;
        case "triangle":
          if (n & 1) {
            b = 2 * (piFactor * piFactor) * (((n - 1) >> 1) & 1 ? -1 : 1);
          } else {
            b = 0;
          }
          this._partials[n - 1] = b;
          break;
        default:
          console.log("Invalid option");
      }
      if (b !== 0) {
        real[n] = -b * Math.sin(phase * n);
        imag[n] = b * Math.cos(phase * n);
      } else {
        real[n] = 0;
        imag[n] = 0;
      }
    }
    return [real, imag];
  }
}

export default WaveTableOscillator;
