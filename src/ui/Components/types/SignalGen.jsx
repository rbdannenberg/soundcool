import React from "react";
import store from "../../../index";
import changeBlock from "../../../handlers";
import "../../../index.css";
// import oscDemo from "../../player-module";

const changeWaveform = (w, id) => {
  store.dispatch({
    type: "CHANGE_BLOCK",
    id: id,
    field: "waveform",
    value: w
  });
};

const changeMod = (w, id) => {
  store.dispatch({
    type: "CHANGE_BLOCK",
    id: id,
    field: "modulation",
    value: w
  });
};

const SignalGen = ({ blockInfo }) => {
  let { id, frequency, waveform, modulation, volume, MI, FD } = blockInfo;
  let modParam;
  if (modulation === "No Mod" || modulation === "RM") {
    modParam = "Not Applicable";
  } else {
    modParam = modulation === "AM" ? "MI for AM: " + MI : "FD for FM: " + FD;
  }
  return (
    <React.Fragment>
      <div className="" style={{ position: "relative", height: "134px" }}>
        {/* frequency slider */}
        <label
          htmlFor="frequency"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "8px",
            top: "5px"
          }}
        >
          {"Frequency(hz): "}
        </label>
        <input
          type="number"
          value={frequency}
          style={{
            position: "absolute",
            width: "40px",
            height: "16px",
            left: "110px",
            top: "7px",
            fontSize: "0.7rem"
          }}
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "frequency",
              value: e.target.value
            });
          }}
        />
        <input
          type="range"
          className="slider"
          style={{
            width: "250px",
            position: "absolute",
            left: "5px",
            top: "24px"
          }}
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "frequency",
              value: e.target.value
            });
          }}
          min={0}
          max={15000}
          value={frequency}
          id="frequency"
        />

        {/* modParam slider */}
        <label
          htmlFor="param"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "8px",
            top: "40px"
          }}
        >
          {modParam}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "250px",
            position: "absolute",
            left: "5px",
            top: "58px"
          }}
          onChange={e => {
            if (modulation === "No Mod" || modulation === "RM") {
              return;
            } else {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: modulation === "AM" ? "MI" : "FD",
                value: Math.floor(Math.pow(Math.E, e.target.value))
              });
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
          class="dropdown"
          style={{
            position: "absolute",
            top: "80px",
            left: "5px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle l-6 "
            style={{
              fontSize: "0.8rem",
              padding: "0px",
              width: "100px",
              height: "25px"
            }}
            id="waveform dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {waveform}
          </button>
          <div
            class="dropdown-menu"
            style={{ fontSize: "0.8rem" }}
            aria-labelledby="waveform dropdown"
          >
            <div
              class="dropdown-item"
              onClick={() => {
                changeWaveform("Silence", id);
              }}
            >
              Silence
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("Sine Wave", id)}
            >
              Sine Wave
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("Triangle", id)}
            >
              Triangle
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("Square", id)}
            >
              Square
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("Sawtooth", id)}
            >
              Sawtooth
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("White Noise", id)}
            >
              White Noise
            </div>
            <div
              class="dropdown-item"
              onClick={() => changeWaveform("Pink Noise", id)}
            >
              Pink Noise
            </div>
          </div>
        </div>
        <div
          class="dropdown"
          style={{
            position: "absolute",
            top: "80px",
            left: "120px"
          }}
        >
          <button
            className="btn-sm btn-light dropdown-toggle"
            style={{
              fontSize: "0.8rem",
              padding: "0px",
              width: "80px",
              height: "25px"
            }}
            id="mod dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {modulation}
          </button>
          <div
            class="dropdown-menu"
            style={{ fontSize: "0.8rem" }}
            aria-labelledby="mod dropdown"
          >
            <div class="dropdown-item" onClick={() => changeMod("No Mod", id)}>
              No Mod
            </div>
            <div class="dropdown-item" onClick={() => changeMod("RM", id)}>
              RM
            </div>
            <div class="dropdown-item" onClick={() => changeMod("AM", id)}>
              AM
            </div>
            <div class="dropdown-item" onClick={() => changeMod("FM", id)}>
              FM
            </div>
          </div>
        </div>

        {/* Volume Slider */}
        <div
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "260px",
            top: "5px"
          }}
        >
          {"Vol: " + volume}{" "}
        </div>
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.5rem",
            height: "100px",
            position: "absolute",
            left: "275px",
            top: "26px"
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
        style={{ backgroundColor: "grey", height: "32px" }}
      >
        <span className="col text-center">
          <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
            Kinect
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="kinect"
            onClick={() => changeBlock(id, "kinect", undefined)}
          />
        </span>
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{ height: "1.5rem", width: "3rem" }}
            id="osc"
            onChange={e => changeBlock(id, "osc", e.target.value)}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SignalGen;
