import ScPitch from "./sc-pitch-phasor.js";

class ScTransposer extends ScPitch {
  constructor(context, options={}) {
    super(context);
    let defOpts = {
      pitchShift: 0,
      grainDur: 50
    };
    this.options = Object.assign(defOpts, options);
    this.pitchShift = this.options.pitchShift;
  }

  set pitchShift(cents) {
    cents = parseInt(cents);
    this.pitch = cents;
    this.options.pitchShift = cents;
  }

  set grainDur(ms) {
    ms = parseInt(ms);
    this.grainSize = ms / 1000;
    this.options.grainDur = ms;
  }
}

export default ScTransposer;
