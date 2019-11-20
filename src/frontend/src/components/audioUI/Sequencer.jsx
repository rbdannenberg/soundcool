import React from "react";
import "./custom.css";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import {
  FaArrowRight,
  FaArrowLeft,
  FaExchangeAlt,
  FaRetweet
} from "react-icons/fa";
import { Knob } from "react-rotary-knob";

const Sequencer = ({ blockInfo, changeBlock }) => {
  const changeWaveform = (w, id, num) => {
    changeBlock(id, "waveforms", w, { num });
  };

  const changeMod = (w, id, num) => {
    changeBlock(id, "modulation", w, { num });
  };

  let {
    // #region props
    id,
    waveforms,
    modulations,
    modulationValues,
    notes,
    durations,
    selecteds,
    skippeds,
    looping,
    playStyle
    // #endregion
  } = blockInfo;
  let l = [0, 1, 2, 3, 4, 5, 6, 7];

  const getNote = x => {
    const noteList = [
      "C",
      "•",
      "C#",
      "•",
      "D",
      "•",
      "D#",
      "•",
      "E",
      "•",
      "F",
      "•",
      "F#",
      "•",
      "G",
      "•",
      "G#",
      "•",
      "A",
      "•",
      "A#",
      "•",
      "B"
    ];
    return noteList[x];
  };

  const Beat = ({
    // #region props
    id,
    num,
    note,
    modValue,
    selected,
    skipped,
    waveform,
    octave,
    mod,
    duration,
    modulation
    // #endregion
  }) => {
    return (
      <div style={{ position: "absolute", width: "70px", height: "160px" }}>
        <div style={{ position: "absolute", width: "70px", height: "100px" }}>
          {/* <Knob /> */}
          <Knob
            style={{
              position: "absolute",
              left: "5px",
              width: "40px",
              height: "40px"
            }}
            preciseMode={false}
            value={note}
            min={0}
            max={23}
            onChange={e =>
              changeBlock(id,"notes",Math.floor(e),{num})
            }
          />
          <div style={{ position: "absolute", top: "40px", left: "18px" }}>
            {getNote(note)}
          </div>
          <Knob
            style={{
              position: "absolute",
              left: "42px",
              top: "30px",
              width: "40px",
              height: "40px"
            }}
            preciseMode={false}
            value={modValue}
            min={0}
            max={1000}
            onChange={e =>
              changeBlock(id,"modulationValues",e,{num})
            }
          />
          <input
            type="number"
            value={duration}
            style={{
              position: "absolute",
              width: "35px",
              height: "16px",
              left: "48px",
              top: "5px",
              fontSize: "0.7rem"
            }}
            onChange={e =>
              changeBlock(id,"durations",e.target.value,{num})
            }
          />
        </div>

        <div style={{ position: "absolute", top: "80px" }}>
          {/* Select and Skip */}
          <div
            className={
              selected
                ? "btn btn-small btn-secondary"
                : "btn btn-small btn-light"
            }
            style={{
              position: "absolute",
              left: "5px",
              top: "2px",
              width: "45px",
              height: "20px",
              fontSize: "0.7rem",
              padding: "0px"
            }}
            onClick={e =>
              changeBlock(id,"selecteds",undefined,{num})
            }
          >
            Select
          </div>
          <div
            className={
              skipped
                ? "btn btn-small btn-secondary"
                : "btn btn-small btn-light"
            }
            style={{
              position: "absolute",
              left: "55px",
              top: "2px",
              width: "30px",
              height: "20px",
              fontSize: "0.7rem",
              padding: "0px"
            }}
            onClick={e =>
              changeBlock(id,"skippeds",undefined,{num})
            }
          >
            Skip
          </div>

          {/* Waveform dropdown */}
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: "23px",
              left: "5px"
            }}
          >
            <button
              className="btn-sm btn-light dropdown-toggle l-6 "
              style={{
                fontSize: "0.7rem",
                padding: "0px",
                width: "80px",
                height: "22px"
              }}
              id="waveform dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {waveform}
            </button>
            <div
              className="dropdown-menu"
              style={{ fontSize: "0.8rem" }}
              aria-labelledby="waveform dropdown"
            >
              <div
                className="dropdown-item"
                onClick={() => {
                  changeWaveform("Silence", id, num);
                }}
              >
                Silence
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("Sine Wave", id, num)}
              >
                Sine Wave
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("Triangle", id, num)}
              >
                Triangle
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("Square", id, num)}
              >
                Square
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("Sawtooth", id, num)}
              >
                Sawtooth
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("White Noise", id, num)}
              >
                White Noise
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeWaveform("Pink Noise", id, num)}
              >
                Pink Noise
              </div>
            </div>
          </div>
          {/* Mods dropdown */}
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: "48px",
              left: "5px"
            }}
          >
            <button
              className="btn-sm btn-light dropdown-toggle"
              style={{
                fontSize: "0.7rem",
                padding: "0px",
                width: "80px",
                height: "22px"
              }}
              id="mod dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {modulation}
            </button>
            <div
              className="dropdown-menu"
              style={{ fontSize: "0.8rem" }}
              aria-labelledby="mod dropdown"
            >
              <div
                className="dropdown-item"
                onClick={() => changeMod("No Mod", id, num)}
              >
                No Mod
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeMod("RM", id, num)}
              >
                RM
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeMod("AM", id, num)}
              >
                AM
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeMod("FM", id, num)}
              >
                FM
              </div>
            </div>
          </div>
        </div>

        {/* notelength slider */}
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1rem",
            height: "150px",
            position: "absolute",
            left: "85px",
            top: "2px"
          }}
          onChange={e => changeBlock(id,"durations",e.target.value,{num})}
          min={0}
          max={10000}
          step={1}
          value={duration}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        className=""
        style={{
          width: "288px",
          height: "520px",
          position: "relative"
        }}
      >
        <div style={{ position: "absolute", top: "2px" }}>
          <label
            htmlFor="signalGenId"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "6px",
              width: "80px"
            }}
          >
            {"signalGen Id: "}
          </label>
          <input
            type="number"
            style={{
              position: "absolute",
              width: "30px",
              height: "16px",
              left: "88px",
              top: "2px",
              fontSize: "0.7rem"
            }}
            onChange={e => changeBlock(id, "signalGenId", e.target.value)}
          />
          <label
            htmlFor="envId"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "125px",
              width: "50px"
            }}
          >
            {"Env Id: "}
          </label>
          <input
            type="number"
            style={{
              position: "absolute",
              width: "30px",
              height: "16px",
              left: "170px",
              top: "2px",
              fontSize: "0.7rem"
            }}
            onChange={e => changeBlock(id, "envId", e.target.value)}
          />

          <FaArrowRight
            style={{
              position: "absolute",
              left: "210px",
              top: "2px",
              backgroundColor:
                playStyle === "forward" ? "darkgrey" : "transparent"
            }}
            onClick={() => changeBlock(id, "playStyle", "forward")}
          />
          <FaArrowLeft
            style={{
              position: "absolute",
              left: "230px",
              top: "2px",
              backgroundColor:
                playStyle === "backward" ? "darkgrey" : "transparent"
            }}
            onClick={() => changeBlock(id, "playStyle", "backward")}
          />
          <FaExchangeAlt
            style={{
              position: "absolute",
              left: "252px",
              top: "2px",
              backgroundColor:
                playStyle === "exchange" ? "darkgrey" : "transparent"
            }}
            onClick={() => changeBlock(id, "playStyle", "exchange")}
          />
          <FaRetweet
            style={{
              position: "absolute",
              left: "276px",
              top: "0px",
              fontSize: "1.2rem",
              backgroundColor: looping ? "darkgrey" : "transparent"
            }}
            onClick={() => changeBlock(id, "looping", undefined)}
          />
        </div>

        {/* all 8 notes */}
        {l.map(x => {
          let top = Math.floor(x / 3) * 160 + 30 + "px";
          let left = (x % 3) * 105 + "px";
          return (
            <div
              key={x}
              style={{
                position: "absolute",
                top: top,
                left: left
              }}
            >
              <Beat
                id={id}
                num={x}
                waveform={waveforms[x]}
                modulation={modulations[x]}
                modValue={modulationValues[x]}
                duration={durations[x]}
                note={notes[x]}
                selected={selecteds[x]}
                skipped={skippeds[x]}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
}
export default connect(
  mapStateToProps,
  { changeBlock }
)(Sequencer);
