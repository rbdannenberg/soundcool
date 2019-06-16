import React from "react";
import store from "../../index";

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
    field: "mod",
    value: w
  });
};

const SignalGen = ({ blockInfo }) => {
  let { id, frequency, waveform, mod, volume } = blockInfo;
  return (
    <React.Fragment>
      <div className="row">
        <div className="text-center col" style={{ width: "14rem" }}>
          <input
            className="slider mx-2 my-3"
            type="range"
            style={{ width: "10rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "frequency",
                value: e.target.value
              });
            }}
            min={139}
            max={15000}
            value={frequency}
            id="frequency"
          />
          <label htmlFor="frequency" style={{ fontSize: "0.8rem" }}>
            {"Frequency(hz): " + frequency}
          </label>

          <div className="row text-center my-2">
            <div class="dropdown col">
              <button
                className="btn btn-info dropdown-toggle l-6 "
                style={{ fontSize: "0.7rem", width: "4.5rem" }}
                id="waveform dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {waveform}
              </button>
              <div class="dropdown-menu" aria-labelledby="waveform dropdown">
                <div
                  class="dropdown-item"
                  onClick={() => changeWaveform("Silence", id)}
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
            <div class="dropdown col">
              <button
                className="btn btn-info dropdown-toggle"
                style={{ fontSize: "0.7rem", width: "4.5rem" }}
                id="mod dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {mod}
              </button>
              <div class="dropdown-menu" aria-labelledby="mod dropdown">
                <div
                  class="dropdown-item"
                  onClick={() => changeMod("No Mod", id)}
                >
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
          </div>
        </div>
        <div className="col" style={{ width: "2rem" }}>
          <div style={{ fontSize: "0.8rem" }}>{"Vol. " + volume} </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{ width: "1.5rem", height: "6rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "volume",
                value: e.target.value
              });
            }}
            min={0}
            max={100}
            step={1}
            value={volume}
            id="volume"
          />
        </div>
      </div>
      <div className="text-center">
        <span className="col text-center">
          <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
            Kinect
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="kinect"
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "kinect",
                value: undefined
              });
            }}
          />
        </span>
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className=""
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

export default SignalGen;
