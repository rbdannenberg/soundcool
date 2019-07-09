import React from "react";
import store from "../../../index";
import changeBlock from "../../../handlers";

const changeInstrument = (i, id) => {
  store.dispatch({
    type: "CHANGE_BLOCK",
    id: id,
    field: "instrument",
    value: i
  });
};

const changeMIDIMessage = (m, id) => {
  store.dispatch({
    type: "CHANGE_BLOCK",
    id: id,
    field: "midiMessage",
    value: m
  });
};

const Keyboard = ({ blockInfo }) => {
  let {
    id,
    instrument,
    channel,
    viewNames,
    volume,
    module,
    octave,
    noteOn,
    midiMessage
  } = blockInfo;
  // a list of 128 general midi instruments
  let instruments = [
    "1 Acoustic Grand Piano",
    "2 Bright Acoustic Piano",
    "3 Electric Grand Piano",
    "4 Honky-Tonk Piano",
    "5 Electric Piano 1",
    "6 Electric Piano 2",
    "7 Harpsichord",
    "8 Clavinet",
    "9 Celesta",
    "10 Glockenspiel",
    "11 Music Box",
    "12 Vibraphone",
    "13 Marimba",
    "14 Xylophone",
    "15 Tubular Bells",
    "16 Dulcimer / Santur",
    "17 Drawbar Organ",
    "18 Percussive Organ",
    "19 Rock Organ",
    "20 Church Organ",
    "21 Reed Organ",
    "22 Accordion",
    "23 Harmonica",
    "24 Tango Accordion / Bandoneon",
    "25 Acoustic Guitar (Nylon)",
    "26 Acoustic Guitar (Steel)",
    "27 Electric Guitar (Jazz)",
    "28 Electric Guitar (Clean)",
    "29 Electric Guitar (Muted)",
    "30 Overdriven Guitar",
    "31 Distortion Guitar",
    "32 Guitar Harmonics",
    "33 Acoustic Bass",
    "34 Electric Bass (Finger)",
    "35 Electric Bass (Pick)",
    "36 Fretless Bass",
    "37 Slap Bass 1",
    "38 Slap Bass 2",
    "39 Synth Bass 1",
    "40 Synth Bass 2",
    "41 Violin",
    "42 Viola",
    "43 Cello",
    "44 Contrabass",
    "45 Tremolo Strings",
    "46 Pizzicato Strings",
    "47 Orchestral Harp",
    "48 Timpani",
    "49 String Ensemble 1",
    "50 String Ensemble 2",
    "51 Synth Strings 1",
    "52 Synth Strings 2",
    "53 Choir Aahs",
    "54 Voice Oohs",
    "55 Synth Voice",
    "56 Orchestra Hit",
    "57 Trumpet",
    "58 Trombone",
    "59 Tuba",
    "60 Muted Trumpet",
    "61 French Horn",
    "62 Brass Section",
    "63 Synth Brass 1",
    "64 Synth Brass 2",
    "65 Soprano Sax",
    "66 Alto Sax",
    "67 Tenor Sax",
    "68 Baritone Sax",
    "69 Oboe",
    "70 English Horn",
    "71 Bassoon",
    "72 Clarinet",
    "73 Piccolo",
    "74 Flute",
    "75 Recorder",
    "76 Pan Flute",
    "77 Blown Bottle",
    "78 Shakuhachi",
    "79 Whistle",
    "80 Ocarina",
    "81 Lead 1 (Square)",
    "82 Lead 2 (Sawtooth)",
    "83 Lead 3 (Calliope)",
    "84 Lead 4 (Chiff)",
    "85 Lead 5 (Charang)",
    "86 Lead 6 (Voice)",
    "87 Lead 7 (Fifths)",
    "88 Lead 8 (Bass + Lead)",
    "89 Pad 1 (New Age)",
    "90 Pad 2 (Warm)",
    "91 Pad 3 (Polysynth)",
    "92 Pad 4 (Choir)",
    "93 Pad 5 (Bowed)",
    "94 Pad 6 (Metallic)",
    "95 Pad 7 (Halo)",
    "96 Pad 8 (Sweep)",
    "97 FX 1 (Rain)",
    "98 FX 2 (Soundtrack)",
    "99 FX 3 (Crystal)",
    "100 FX 4 (Atmosphere)",
    "101 FX 5 (Brightness)",
    "102 FX 6 (Goblins)",
    "103 FX 7 (Echoes)",
    "104 FX 8 (Sci-Fi)",
    "105 Sitar",
    "106 Banjo",
    "107 Shamisen",
    "108 Koto",
    "109 Kalimba",
    "110 Bagpipe",
    "111 Fiddle",
    "112 Shanai",
    "113 Tinkle Bell",
    "114 Agogo",
    "115 Steel Drums",
    "116 Woodblock",
    "117 Taiko Drum",
    "118 Melodic Tom",
    "119 Synth Drum",
    "120 Reverse Cymbal",
    "121 Guitar Fret Noise",
    "122 Breath Noise",
    "123 Seashore",
    "124 Bird Tweet",
    "125 Telephone Ring",
    "126 Helicopter",
    "127 Applause",
    "128 Gunshot"
  ];
  let noteNames = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI", "DO"];
  return (
    <React.Fragment>
      <div
        className=""
        style={{
          width: "288px",
          height: "178px",
          position: "relative"
        }}
      >
        {/* Instrument Dropdown menu */}
        <div
          class="dropdown"
          style={{
            position: "absolute",
            top: "5px",
            left: "10px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle l-6 "
            style={{
              fontSize: "0.8rem",
              padding: "0px",
              width: "220px",
              height: "25px"
            }}
            id="instrument dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {instrument}
          </button>
          <div
            class="dropdown-menu"
            style={{ fontSize: "0.8rem" }}
            aria-labelledby="instrument dropdown"
          >
            {instruments.map(i => (
              <div
                class="dropdown-item"
                onClick={() => {
                  changeInstrument(i, id);
                  changeMIDIMessage(
                    "0xc" +
                      (channel - 1).toString(16) +
                      instruments.indexOf(i).toString(16),
                    id
                  );
                }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        {console.log(midiMessage)}

        {/* Output selection */}
        <button
          className="badge-light badge-sm"
          style={{ fontSize: "0.8rem" }}
          onClick={() => changeBlock(id, "module", undefined)}
          style={{
            position: "absolute",
            top: "5px",
            left: "240px",
            width: "70px",
            height: "34px",
            lineHeight: "13px",
            fontSize: "0.7rem"
          }}
        >
          {module ? "Module Ouput" : "Internal Synth"}
        </button>

        {/* White keys */}
        {[...Array(8).keys()].map(i => (
          <div
            style={{
              position: "absolute",
              top: "42px",
              left: 30 * i + 10 + "px",
              width: "30px",
              height: "100px",
              backgroundColor: noteOn[i] ? "#7DE4FC" : "#DCDEE0",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "black"
            }}
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id,
                field: "noteOn",
                num: i,
                value: undefined
              });
              let status = (noteOn[i] ? "9" : "8") + (channel - 1).toString(16);
              let white = [0, 2, 4, 5, 7, 9, 11, 12];
              let key = white[i] + octave * 12;
              changeMIDIMessage(
                "0x" + status + key.toString(16) + volume.toString(16),
                id
              );
            }}
          />
        ))}

        {/* Black keys */}
        {[...Array(2).keys()].map(i => (
          <div
            style={{
              position: "absolute",
              top: "42px",
              left: 30 * i + 30 + "px",
              width: "20px",
              height: "65px",
              backgroundColor: noteOn[i + 8] ? "#7DE4FC" : "black",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "black"
            }}
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id,
                field: "noteOn",
                num: i + 8,
                value: undefined
              });
              let status = (noteOn[i] ? "9" : "8") + (channel - 1).toString(16);
              let black1 = [1, 3];
              let key = black1[i] + octave * 12;
              changeMIDIMessage(
                "0x" + status + key.toString(16) + volume.toString(16),
                id
              );
            }}
          />
        ))}
        {[...Array(3).keys()].map(i => (
          <div
            style={{
              position: "absolute",
              top: "42px",
              left: 30 * i + 120 + "px",
              width: "20px",
              height: "65px",
              backgroundColor: noteOn[i + 10] ? "#7DE4FC" : "black",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "black"
            }}
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id,
                field: "noteOn",
                num: i + 10,
                value: undefined
              });
              let status = (noteOn[i] ? "9" : "8") + (channel - 1).toString(16);
              let black2 = [6, 8, 10];
              let key = black2[i] + octave * 12;
              changeMIDIMessage(
                "0x" + status + key.toString(16) + volume.toString(16),
                id
              );
            }}
          />
        ))}

        {/* Channel Selection */}
        <label
          htmlFor="channel"
          style={{
            position: "absolute",
            top: "148px",
            left: "10px",
            fontSize: "0.8rem"
          }}
        >
          MIDI CHANNEL:
        </label>
        <div
          class="dropdown"
          style={{
            position: "absolute",
            top: "145px",
            left: "110px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle l-6 "
            style={{
              fontSize: "0.8rem",
              padding: "0px",
              width: "40px",
              height: "25px"
            }}
            id="channel dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {channel}
          </button>
          <div
            class="dropdown-menu"
            style={{ fontSize: "0.8rem" }}
            aria-labelledby="channel dropdown"
          >
            {[...Array(16).keys()].map(i => (
              <div
                class="dropdown-item"
                onClick={() => {
                  changeBlock(id, "channel", i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* View Note names */}
        <label
          htmlFor="viewNames"
          style={{
            position: "absolute",
            top: "148px",
            left: "160px",
            fontSize: "0.8rem",
            width: "160px"
          }}
        >
          View Note Names:
        </label>
        <input
          type="checkbox"
          className="m-1"
          id="viewNames"
          style={{
            position: "absolute",
            top: "148px",
            left: "268px",
            fontSize: "0.8rem"
          }}
          onClick={() => changeBlock(id, "viewNames", undefined)}
        />
        {viewNames ? (
          [...Array(8).keys()].map(i => (
            <div
              style={{
                position: "absolute",
                fontSize: "0.7rem",
                top: "120px",
                left: i * 30 + 16 + "px"
              }}
            >
              {noteNames[i]}
            </div>
          ))
        ) : (
          <span />
        )}

        {/* Volume Slider */}
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.5rem",
            height: "100px",
            position: "absolute",
            left: "268px",
            top: "42px"
          }}
          onChange={e => {
            changeBlock(id, "volume", e.target.value);
          }}
          min={0}
          max={127}
          step={1}
          value={volume}
          id="volume"
        />
      </div>

      {/* Footer */}
      <div
        className=""
        style={{
          position: "relative",
          backgroundColor: "grey",
          height: "30px"
        }}
      >
        {/* octave */}
        <span className="text-center">
          <div
            class="dropdown"
            style={{
              position: "absolute",
              top: "3px",
              left: "60px"
            }}
          >
            <button
              className="btn-sm btn-light dropdown-toggle l-6 "
              style={{
                fontSize: "0.8rem",
                padding: "0px",
                width: "45px",
                height: "23px"
              }}
              id="octave dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {"C" + octave}
            </button>
            <div
              class="dropdown-menu"
              style={{ fontSize: "0.8rem" }}
              aria-labelledby="octave dropdown"
            >
              {[...Array(11).keys()].map(i => (
                <div
                  class="dropdown-item"
                  onClick={() => {
                    changeBlock(id, "octave", i - 2);
                  }}
                >
                  {"C" + (i - 2)}
                </div>
              ))}
            </div>
          </div>
        </span>
        {/* osc port */}
        <span
          className="text-center"
          style={{ position: "absolute", left: "140px", top: "0px" }}
        >
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{ height: "1.5rem", width: "3rem" }}
            id="osc"
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "osc",
                value: e.target.value
              });
            }}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default Keyboard;
