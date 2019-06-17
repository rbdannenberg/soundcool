const toHex = (r, g, b) => {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
};

const specValues = {
  Delay: {
    color: toHex(210, 189, 120),
    delayTime: 76,
    feedback: 0.119,
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
    direction: 0,
    kinect: false,
    osc: undefined
  },
  Player: {
    inDisabled: true,
    color: toHex(229, 119, 125),
    playing: false,
    loop: false,
    volume: 60,
    file: undefined,
    kinect: false,
    osc: undefined
  },
  SignalGen: {
    color: toHex(89, 199, 198),
    frequency: 440,
    waveform: "Silence",
    mod: "No Mod",
    volume: 60,
    kinect: false,
    osc: undefined
  },
  Speaker: {
    color: toHex(240, 254, 199),
    muted: false
  },
  DirectInput: {
    inDisabled: true,
    color: toHex(200, 231, 253),
    direction: 0,
    muted: false,
    channel: 1,
    volume: 60,
    osc: undefined
  },
  Pitch: {
    color: toHex(220, 105, 216),
    cents: 0,
    kinect: false,
    osc: undefined
  },
  VSTHost: {
    color: toHex(136, 179, 95),
    file: undefined,
    module: true,
    version: "to Soundcool 3.1.1",
    channel: 1,
    osc: undefined
  }
};

export default specValues;
