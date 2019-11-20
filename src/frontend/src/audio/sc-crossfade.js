class ScCrossFade {
  constructor(context, options = {}) {
    let defOpts = {
      fadeValue: 0.2
    };
    this.options = Object.assign(defOpts, options);
    this.context = context;
    this.setupNodes();
  }

  makeEqualPowerCurve(buffLen = 4096) {
    var buffer = new Float32Array(buffLen);
    let x;
    for (let i = 0; i < buffLen; i++) {
      x = 2 * (i / (buffLen - 1)) - 1;
      if (Math.abs(x) < 0.001) {
        buffer[i] = 0;
      } else {
        buffer[i] = Math.sin(Math.PI * 0.5 * x);
      }
    }
    return buffer;
  }

  setupNodes() {
    this.inNode1 = this.context.createGain();
    this.inNode2 = this.context.createGain();
    this.outNode = this.context.createGain();
    this.fader = this.context.createConstantSource();
    this.fader.start(0);
    var curve = this.makeEqualPowerCurve();
    this.eqPower1 = this.context.createWaveShaper();
    this.eqPower1.curve = curve;
    this.eqPower2 = this.context.createWaveShaper();
    this.eqPower2.curve = curve;
    this.one = this.context.createConstantSource();
    this.one.offset.value = 1;
    this.one.start(0);
    this.negate = this.context.createGain();
    this.negate.gain.value = -1;
    this.sum = this.context.createGain();

    this.inNode1.connect(this.outNode);
    this.inNode2.connect(this.outNode);
    this.inNode2.gain.cancelScheduledValues(0);
    this.inNode2.gain.setValueAtTime(0, 0);
    this.fader.connect(this.eqPower2);
    this.eqPower2.connect(this.inNode2.gain);
    this.one.connect(this.sum);
    this.fader.connect(this.negate);
    this.negate.connect(this.sum);
    this.inNode1.gain.cancelScheduledValues(0);
    this.inNode1.gain.setValueAtTime(0, 0);
    this.sum.connect(this.eqPower1);
    this.eqPower1.connect(this.inNode1.gain);

    this.fadeValue = this.options.fadeValue;
  }

  set fadeValue(val) {
    val = parseFloat(val);
    this.options.fadeValue = val;
    this.fader.offset.value = val;
  }
}

export default ScCrossFade;
