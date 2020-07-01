const toHex = (r, g, b) => {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
};

const audioDefaults = {
  Delay: {
    delayTime: 76,
    maxDelayTime: 10000,
    delayFeedback: 0.119
  },
  Transposer: {
    buttonCents: 0,
    sliderCents: 0,
    pitchShift: 0,
    grainDur: 50
  },
  Pan: {
    panVal: 0
  },
  Player: {
    playing: false,
    reversed: false,
    loop: false,
    speed: 1,
    volume: 100,
    playedTime: 0,
    URL: undefined
  },
  SignalGen: {
    frequency: 440,
    waveform: "Silence",
    modulation: "No Mod",
    MI: 0,
    FD: 0,
    volume: 100
  },
  Speaker: {
    suspended: false,
    meterL: 60,
    meterR: 60
  },
  DirectInput: {
    direction: 0,
    muted: false,
    channel: 1,
    volume: 0.6
  },
  Pitch: {
    pitch: 0,
    grainSize: 0.1
  },
  VSTHost: {
  },
  Routing: {
  },
  Mixer: {
    masterGain: 0.6,
    node0Gain: 0.6,
    node1Gain: 0.6,
    node2Gain: 0.6,
    node3Gain: 0.6,
    node4Gain: 0.6,
    node5Gain: 0.6,
    node6Gain: 0.6,
    node7Gain: 0.6
  },
  Record: {
  },
  Spectroscope: {
  },
  Oscilloscope: {
  },
  Envelope: {
    loop: false,
    style: "line",
    duration: 1.0,
    startSampleId: 0,
    endSampleId: 0,
    sustainAmp: 0,
    arr: []
  },
  Filter: {
  },
  Sequencer: {
  },
  SamplePlayer: {
    random: false,
    loop: false,
    speed: 1,
    reversed: false,
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
      undefined
    ],
    masterVolume: 100
  },
  Keyboard: {
  },
  Reverb: {
    preset: "Hall",
    mix: 0.5,
    bypass: false
  },
  GranSynth: {
    rate: 100,
    ioi_jitter: 0.5,
    dur: 0.05,
    pitch_shift: 0,
    pitch_jitter: 0,
    reverse: 0,
    pan: 0,
    pan_jitter: 0,
    delay: 1,
    delay_jitter: 2
  }
};

const uiDefaults = {
  Delay: {
    color: toHex(210, 189, 120),
    osc: false,
    oscPort: undefined
  },
  Transposer: {
    color: toHex(193, 133, 200),
    osc: undefined
  },
  Pan: {
    color: toHex(136, 179, 95),
    osc: false,
    oscPort: undefined
  },
  Player: {
    inDisabled: true,
    color: toHex(229, 119, 125),
    osc: false,
    oscPort: undefined,
    file: undefined
  },
  SignalGen: {
    color: toHex(89, 199, 198),
    osc: false,
    oscPort: undefined
  },
  Speaker: {
    color: toHex(240, 254, 199),
    renderRate: 100
  },
  DirectInput: {
    inDisabled: true,
    color: toHex(200, 231, 253),
    volume: 0.6,
    osc: undefined
  },
  Pitch: {
    color: toHex(220, 105, 216),
    osc: false,
    oscPort: undefined
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
    osc: false,
    oscPort: undefined
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
    osc: undefined
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
    osc: false,
    oscPort: undefined,
    inDisableds: [true, true, true, true, true, true, true, true, true, true]
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
    color: toHex(122, 187, 197)
  },
  GranSynth: {
    color: toHex(114, 229, 190),
    osc: false,
    oscPort: undefined
  }
};

let mergedConfig = {};
for (let [module, moduleUIDefaults] of Object.entries(uiDefaults)) {
  let moduleAudioDefaults = audioDefaults[module];
  mergedConfig[module] = Object.assign(moduleUIDefaults, moduleAudioDefaults);
}
const specValues = mergedConfig;

//export default specValues;
export {specValues, audioDefaults};
