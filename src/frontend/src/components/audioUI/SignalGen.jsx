import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import "./custom.css";
import LogInput from "./LogInput";
// import oscDemo from "../../player-module";



const SignalGen = ({ blockInfo, changeBlock }) => {
  let { id, frequency, waveform, modulation, volume, MI, FD } = blockInfo;
  let modParam;
  const minFrequencySlider = 40;
  const maxFrequencySlider = 10000;
  const changeWaveform = (w, id) => changeBlock(id, "waveform", w);

  const changeMod = (w, id) => {
    changeBlock(id, "modulation", w);
  };

  if (modulation === "No Mod" || modulation === "RM") {
    modParam = "Not Applicable";
  } else {
    modParam = modulation === "AM" ? "MI for AM: " + MI : "FD for FM: " + FD;
  }
  return (
    <React.Fragment>
      <div className="" style={{ position: "relative", height: "100px" }}>
        {/* frequency slider */}
        <label
          htmlFor="frequency"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "6px",
            top: "4px"
          }}
        >
          {"Frequency(hz): "}
        </label>
        <input
          type="number"
          value={parseInt(frequency)}
          style={{
            position: "absolute",
            width: "48px",
            height: "12px",
            left: "78px",
            top: "2px",
            fontSize: "0.64rem"
          }}
          onChange={e => {
            let value = parseInt(e.target.value);
            value = isNaN(value) ? 0 : value;
            changeBlock(id, "frequency", value);
          }}
        />
        <LogInput
          className="slider"
          style={{
            width: "10rem",
            position: "absolute",
            left: "5px",
            top: "16px"
          }}
          type="range"
          id="frequency"
          blockID={id}
          frequency={frequency}
          changeBlock={changeBlock}
          maxrange={maxFrequencySlider}
          minrange={minFrequencySlider}
        />
        {/* modParam slider */}
        <label
          htmlFor="param"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "8px",
            top: "35px"
          }}
        >
          {modParam}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "10rem",
            position: "absolute",
            left: "5px",
            top: "45px"
          }}
          onChange={e => {
            if (modulation === "No Mod" || modulation === "RM") {
              return;
            } else {
              changeBlock(
                id,
                modulation === "AM" ? "MI" : "FD",
                Math.floor(Math.pow(Math.E, e.target.value))
              );
            }
          }}
          min={0}
          max={modulation === "AM" ? 20 : 10}
          step={modulation === "AM" ? 0.1 : 0.01}
          value={
            modParam === "Not applicable"
              ? 0
              : modulation === "AM"
              ? MI
              : Math.log(FD)
          }
          id="param"
        />

        {/* Two Dropdowns */}
        <div
          className="dropdown"
          style={{
            position: "absolute",
            top: "66px",
            left: "5px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle l-6 "
            style={{
              fontSize: "0.64rem",
              padding: "0px",
              width: "64px",
              height: "20px"
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
            style={{ fontSize: "0.64rem", minWidth: "0rem" }}
            aria-labelledby="waveform dropdown"
          >
            <div
              className="dropdown-item"
              onClick={() => {
                changeWaveform("Silence", id);
              }}
            >
              Silence
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("Sine Wave", id)}
            >
              Sine Wave
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("Triangle", id)}
            >
              Triangle
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("Square", id)}
            >
              Square
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("Sawtooth", id)}
            >
              Sawtooth
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("White Noise", id)}
            >
              White Noise
            </div>
            <div
              className="dropdown-item"
              onClick={() => changeWaveform("Pink Noise", id)}
            >
              Pink Noise
            </div>
          </div>
        </div>
        <div
          className="dropdown"
          style={{
            position: "absolute",
            top: "66px",
            left: "100px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle"
            style={{
              fontSize: "0.64rem",
              padding: "0px",
              width: "64px",
              height: "20px"
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
            style={{ fontSize: "0.64rem", minWidth: "0rem" }}
            aria-labelledby="mod dropdown"
          >
            <div
              className="dropdown-item"
              onClick={() => changeMod("No Mod", id)}
            >
              No Mod
            </div>
            <div className="dropdown-item" onClick={() => changeMod("RM", id)}>
              RM
            </div>
            <div className="dropdown-item" onClick={() => changeMod("AM", id)}>
              AM
            </div>
            <div className="dropdown-item" onClick={() => changeMod("FM", id)}>
              FM
            </div>
          </div>
        </div>

        {/* Volume Slider */}
        <div
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "10.55rem",
            top: "-1px",
            width: "3rem",
          }}
        >
          {"Vol: " + volume}
        </div>
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.2rem",
            height: "80px",
            position: "absolute",
            left: "11.0625rem",
            top: "12px"
          }}
          onChange={e => changeBlock(id, "volume", e.target.value)}
          min={0}
          max={100}
          step={1}
          value={volume}
          id="volume"
        />
      </div>

      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "24px" }}
      >
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.64rem",
            marginBottom: "0"}}>
            OSC
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="osc"
            onClick={() => changeBlock(id, "osc", undefined)}
          />
        </span>
        <span className="col text-center">
          <label htmlFor="oscPort" style={{ fontSize: "0.64rem",
            marginBottom: "0"}}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{height: "1.2rem", width: "2.4rem", fontSize: "0.64rem"}}
            id="oscPort"
            onChange={e => changeBlock(id, "oscPort", e.target.value)}
          />
        </span>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(
  mapStateToProps,
  { changeBlock }
)(SignalGen);
