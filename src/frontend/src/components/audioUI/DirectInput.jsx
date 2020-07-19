import React from "react";
import { connect } from "react-redux";
import { changeBlock } from "./actions";

const DirectInput = ({ blockInfo,changeBlock }) => {
  // catch
  // store.dispatch('delete')

  let { id, direction, volume } = blockInfo;
  return (
    <React.Fragment>
      <div className="" style={{ position: "relative", height: "5rem", width: "13rem" }}>
        <div
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "0px",
            left: "5.4375rem"
          }}
        >
          Pan
        </div>
        <span
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "5px",
            top: "15px"
          }}
        >
          L
        </span>
        <input
          className="slider"
          type="range"
          style={{
            width: "160px",
            position: "absolute",
            left: "15px",
            top: "12px"
          }}
          onChange={e => changeBlock(id, "direction", e.target.value)}
          min={-50}
          max={50}
          value={direction}
          id="direction"
        />
        <span
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "177px",
            top: "15px"
          }}
        >
          R
        </span>

        {/* Progress Bar */}
        <div
          className="progress"
          style={{
            width: "10rem",
            position: "absolute",
            top: "2.3875rem",
            left: "0.9375rem",
            backgroundColor: "black",
            height: "0.7rem"
          }}
        >
          <div
            className="progress-bar "
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%", backgroundColor: "green" }}
          />
        </div>

        {/* Mute and Channel */}
        <div
          className="text-center"
          style={{ position: "absolute", top: "3.625rem" }}
        >
          <label
            htmlFor="muted"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "0.9375rem",
              top: "2px"
            }}
          >
            Mute
          </label>
          <input
            type="checkbox"
            className="my-1"
            id="muted"
            style={{ position: "absolute", left: "2.525rem", top: "-0.125rem" }}
            onClick={() =>changeBlock(id, "muted", undefined)}
          />
          <label
            htmlFor="channel"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "4.6875rem",
              top: "2px"
            }}
          >
            Channel:
          </label>
          <input
            type="text"
            className=""
            style={{
              height: "1.2rem",
              width: "1.8rem",
              position: "absolute",
              left: "7.5rem",
              fontSize: "0.64rem"
            }}
            id="channel"
            onChange={e => changeBlock(id, "channel", e.target.value)}
          />
        </div>

        {/* Volume Slider */}
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.2rem",
            height: "72px",
            position: "absolute",
            left: "185px",
            top: "2px"
          }}
          onChange={e => changeBlock(id, "volume", e.target.value)}
          min={0}
          max={10}
          step={0.1}
          value={volume}
          id="volume"
        />
      </div>

      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "24px" }}
      >
        <button
          className="badge-pill badge-light badge-sm mx-2 my-1"
          style={{ fontSize: "0.64rem" }}
        >
          Audio Settings
        </button>
        <span className="">
          <label htmlFor="osc" style={{ fontSize: "0.64rem",
            marginBottom: "0"}}>
            OSC port:
          </label>
          <input
            type="text"
            className="m-1"
            style={{height: "1.2rem", width: "2.4rem", fontSize: "0.64rem"}}
            id="osc"
            onChange={e => changeBlock(id, "osc", e.target.value)}
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
}
export default connect(
  mapStateToProps,
  { changeBlock }
)(DirectInput);
