class ScOscillator {
  constructor(context, options = {}) {
    this.context = context;
    let defOpts;
    defOpts = {
      waveType: "Silence",
      freq: 440
    };
    this.options = Object.assign(defOpts, options);
    this.bufferSources = ["Silence", "White Noise", "Pink Noise"];
    this.oscSources = ["Sine Wave", "Triangle", "Sawtooth", "Square"];
    this.outNode = this.context.createGain();
    this.connectSource(this.options.waveType);
    this.frequency = this.options.freq;
  }

  connectSource(waveType) {
    switch (waveType) {
      case "Sine Wave":
        this.inNode = this.context.createOscillator();
        this.setOscType(waveType);
        break;
      case "Triangle":
        this.inNode = this.context.createOscillator();
        this.setOscType(waveType);
        break;
      case "Sawtooth":
        this.inNode = this.context.createOscillator();
        this.setOscType(waveType);
        break;
      case "Square":
        this.inNode = this.context.createOscillator();
        this.setOscType(waveType);
        break;
      case "White Noise":
        this.inNode = this.createAndFillBuffer("White Noise");
        break;
      case "Pink Noise":
        this.inNode = this.createAndFillBuffer("Pink Noise");
        break;
      case "Silence":
        this.inNode = this.createAndFillBuffer("Silence");
        break;
    }
    this.inNode.start();
    this.inNode.connect(this.outNode);
  }

  detachSource() {
    this.inNode.stop();
    this.inNode.disconnect(this.outNode);
  }

  setOscType(soundType) {
    switch (soundType) {
      case "Sine Wave":
        this.inNode.type = "sine";
        break;
      case "Triangle":
        this.inNode.type = "triangle";
        break;
      case "Sawtooth":
        this.inNode.type = "sawtooth";
        break;
      case "Square":
        this.inNode.type = "square";
        break;
    }
  }

  fillBuffer(buffer, soundType) {
    let dataL = buffer.getChannelData(0);
    let dataR = buffer.getChannelData(1);
    switch (soundType) {
      case "White Noise":
        fillWhiteNoise(dataL, dataR);
        break;
      case "Pink Noise":
        fillPinkNoise(dataL, dataR);
        break;
      case "Silence":
        fillSilence(dataL, dataR);
        break;
    }
  }

  createAndFillBuffer(soundType) {
    let inNode = this.context.createBufferSource();
    const buffSize = 1 * this.context.sampleRate;
    let buffer = this.context.createBuffer(
      2,
      buffSize,
      this.context.sampleRate
    );
    this.fillBuffer(buffer, soundType);
    inNode.buffer = buffer;
    inNode.loop = true;
    return inNode;
  }

  connect(outNode) {
    this.outNode.connect(outNode);
  }

  disconnect(outNode) {
    this.outNode.disconnect(outNode);
  }

  set waveform(newSoundType) {
    if (
      this.bufferSources.includes(this.options.waveType) &&
      this.bufferSources.includes(newSoundType)
    ) {
      this.fillBuffer(this.inNode.buffer, newSoundType);
    } else if (
      this.oscSources.includes(this.options.waveType) &&
      this.oscSources.includes(newSoundType)
    ) {
      this.setOscType(newSoundType);
    } else {
      this.detachSource();
      this.connectSource(newSoundType);
    }
    this.options.waveType = newSoundType;
    this.frequency = this.options.freq;
  }

  set frequency(value) {
    this.options.freq = value;
    if (this.oscSources.includes(this.options.waveType)) {
      this.inNode.frequency.value = value;
    } else {
      let errStr =
        "WARN: Changing frequency value of non-" +
        "Oscillator source has no effect.";
      console.log(errStr);
    }
  }
}

function fillWhiteNoise(dataL, dataR) {
  let sample;
  for (let i = 0; i < dataL.length; i++) {
    sample = Math.random() * 2 - 1;
    dataL[i] = sample;
    dataR[i] = sample;
  }
}

function fillSilence(dataL, dataR) {
  let sample;
  for (let i = 0; i < dataL.length; i++) {
    sample = 0;
    dataL[i] = sample;
    dataR[i] = sample;
  }
}

function fillPinkNoise(dataL, dataR) {
  /**
   * Approximates pink noise effect using
   * Paul Kellet’s refined method
   *
   * source:
   * http://noisehack.com/generate-noise-web-audio-api
   */

  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0;
  let sample;

  for (let i = 0, imax = dataL.length; i < imax; i++) {
    let white = Math.random() * 2 - 1;

    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;

    sample = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    sample *= 0.11;
    dataL[i] = sample;
    dataR[i] = sample;
    b6 = white * 0.115926;
  }
}

export default ScOscillator;
