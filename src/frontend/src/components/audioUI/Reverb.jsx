import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { Knob } from "react-rotary-knob";
import "./custom.css";

const Reverb = ({ blockInfo, changeBlock }) => {
  let { id, preset, mix, bypass } = blockInfo;
  const changePreset = (w, id) => changeBlock(id, "preset", w);

  return (
    <React.Fragment>
      <div className="" style={{ position: "relative", height: "84px" }}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "5px"
          }}
        >
          {/* preset */}
          <div>
            <label htmlFor="preset dropdown" style={{ fontSize: "0.8rem" }}>
              Preset:
            </label>
            <button
              className="btn-sm btn-light dropdown-toggle l-6 "
              style={{
                position: "absolute",
                fontSize: "0.8rem",
                padding: "0px",
                left: "50px",
                width: "70px",
                height: "25px"
              }}
              id="preset dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {preset}
            </button>
            <div
              className="dropdown-menu"
              style={{ fontSize: "0.8rem" }}
              aria-labelledby="preset dropdown"
            >
              <div
                className="dropdown-item"
                onClick={() => {
                  changePreset("Hall", id);
                }}
              >
                Hall
              </div>
              <div
                className="dropdown-item"
                onClick={() => changePreset("Tunnel", id)}
              >
                Tunnel
              </div>
              <div
                className="dropdown-item"
                onClick={() => changePreset("Bridge", id)}
              >
                Bridge
              </div>
              <div
                className="dropdown-item"
                onClick={() => changePreset("Stairwell", id)}
              >
                Stairwell
              </div>
              <div
                className="dropdown-item"
                onClick={() => changePreset("Room", id)}
              >
                Room
              </div>
            </div>
          </div>

          {/* dry/wet mix */}
          <label
            htmlFor="mix"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "130px",
              top: "2px",
              width: "100px"
            }}
          >
            Dry/Wet Mix:
          </label>
          <Knob
            style={{
              position: "absolute",
              top: "0px",
              left: "210px",
              width: "50px",
              height: "50px"
            }}
            preciseMode={false}
            value={mix}
            min={0}
            max={1}
            id="mix"
            onChange={e => changeBlock(id, "mix", e)}
          />

          {/* bypass */}
          <div
            className={
              bypass ? "btn btn-small btn-secondary" : "btn btn-small btn-light"
            }
            style={{
              position: "absolute",
              left: "50px",
              top: "40px",
              width: "45px",
              height: "20px",
              fontSize: "0.7rem",
              padding: "0px"
            }}
            onClick={e => changeBlock(id, "bypass", undefined)}
          >
            Bypass
          </div>
        </div>
      </div>

      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "32px" }}
      >
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
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
          <label htmlFor="oscPort" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{ height: "1.5rem", width: "3rem" }}
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
)(Reverb);
