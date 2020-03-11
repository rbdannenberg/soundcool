const toHex = (r, g, b) => {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
};

const specValues = {
  Delay: {
    color: toHex(210, 189, 120),
    delayTime: 76,
    delayFeedback: 0.119,
    kinect: false,
    osc: undefined
  },
  Transposer: {
    color: toHex(193, 133, 200),
    buttonCents: 0,
    sliderCents: 0,
    osc: undefined
  },
  Pan: {
    color: toHex(136, 179, 95),
    panVal: 0,
    kinect: false,
    osc: undefined
  },
  Player: {
    inDisabled: true,
    color: toHex(229, 119, 125),
    playing: false,
    reversed: false,
    loop: false,
    speed: 1,
    volume: 100,
    playedTime: 0,
    file: undefined,
    kinect: false,
    osc: undefined
  },
  SignalGen: {
    color: toHex(89, 199, 198),
    frequency: 440,
    waveform: "Silence",
    modulation: "No Mod",
    MI: 0,
    FD: 0,
    volume: 100,
    kinect: false,
    osc: undefined
  },
  Speaker: {
    color: toHex(240, 254, 199),
    muted: false,
    meterL: 60,
    meterR: 60,
    renderRate: 100
  },
  DirectInput: {
    inDisabled: true,
    color: toHex(200, 231, 253),
    direction: 0,
    muted: false,
    channel: 1,
    volume: 0.6,
    osc: undefined
  },
  Pitch: {
    color: toHex(220, 105, 216),
    pitch: 0,
    kinect: false,
    grainSize: 0.1,
    osc: undefined
  },
  VSTHost: {
    color: toHex(136, 179, 95),
    file: undefined,
    module: true,
    version: "to Soundcool 3.1.1",
    channel: 1,
    osc: undefined
  },
  Routing: {
    color: toHex(58, 82, 221),
    inDisabled: true,
    outDisabled: true,
    off1: true,
    output11: false,
    output21: false,
    off2: true,
    output12: false,
    output22: false
  },
  Mixer: {
    color: toHex(103, 227, 229),
    inDisabled: true,
    masterGain: 0.6,
    node0Gain: 0.6,
    node1Gain: 0.6,
    node2Gain: 0.6,
    node3Gain: 0.6,
    node4Gain: 0.6,
    node5Gain: 0.6,
    node6Gain: 0.6,
    node7Gain: 0.6,
    osc: undefined
  },
  Record: {
    color: toHex(159, 125, 119),
    outDisabled: true,
    module: false,
    fileName: undefined,
    recording: false,
    volume: 60,
    timer: 0
  },
  Spectroscope: {
    color: toHex(141, 104, 133),
    outDisabled: true,
    renderRate: 100
  },
  Oscilloscope: {
    color: toHex(141, 104, 133),
    outDisabled: true,
    renderRate: 100
  },
  Envelope: {
    color: toHex(80, 174, 55),
    pointCount: 0,
    envelope: [],
    loop: false,
    style: "line",
    duration: 1.0,
    osc: undefined,
    startSampleId: 0,
    endSampleId: 0,
    sustainAmp: 0,
    arr: []
  },
  Filter: {
    color: toHex(144, 81, 57)
  },
  Sequencer: {
    color: toHex(202, 240, 253),
    inDisabled: true,
    outDisabled: true,
    waveforms: [
      "Silence",
      "Silence",
      "Silence",
      "Silence",
      "Silence",
      "Silence",
      "Silence",
      "Silence",
      "Silence"
    ],
    modulations: [
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod",
      "No Mod"
    ],
    modulationValues: [0, 0, 0, 0, 0, 0, 0, 0],
    notes: [0, 4, 8, 10, 14, 18, 22, 0],
    durations: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    selecteds: [true, true, true, true, true, true, true, true],
    skippeds: [false, false, false, false, false, false, false, false],
    looping: false,
    playStyle: "None"
  },
  SamplePlayer: {
    color: toHex(229, 119, 125),
    inDisabled: true,
    random: false,
    loop: false,
    speed: 1,
    reversed: false,
    kinect: false,
    osc: undefined,
    playings: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ],
    files: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    inDisableds: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    masterVolume: 60
  },
  Keyboard: {
    color: toHex(89, 162, 179),
    inDisabled: true,
    instrument: "1 Acoustic Grand Piano",
    channel: 1,
    viewNames: false,
    volume: 60,
    module: false,
    octave: "3",
    //
    noteOn: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ],
    midiMessage: undefined
  },
  Reverb: {
    color: toHex(122, 187, 197),
    preset: "Hall",
    mix: 0.5,
    bypass: false
  }
};

export default specValues;
