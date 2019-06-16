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
  let { id, frequency, waveform, mod } = blockInfo;
  return (
    <React.Fragment>
      <div className="text-center">
        <input
          className="slider m-2"
          type="range"
          style={{ width: "13rem" }}
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

        <div className="row text-center">
          <div class="dropdown col">
            <button
              className="btn btn-info m-1 dropdown-toggle l-6 "
              style={{ fontSize: "0.8rem" }}
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
              className="btn btn-info m-1 dropdown-toggle"
              style={{ fontSize: "0.8rem" }}
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
      <div className="text-center row">
        <span className="col-md-4">
          <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
            Kinect
          </label>
          <input
            type="checkbox"
            className="m-2 "
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
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="m-2"
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
