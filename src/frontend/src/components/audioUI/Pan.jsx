import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

const Pan = ({ blockInfo, changeBlock }) => {
  let { id, panVal } = blockInfo;
  return (
    <React.Fragment>
      <div
        className="text-center"
        style={{ width: "288px", height: "40px", position: "relative" }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "20px",
            top: "10px"
          }}
        >
          L
        </span>
        <input
          className="slider mx-2"
          type="range"
          style={{
            width: "208px",
            position: "absolute",
            left: "24px",
            top: "12px"
          }}
          onChange={e => changeBlock(id, "panVal", e.target.value)}
          min={-50}
          max={50}
          value={panVal}
          id="panVal"
        />
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "244px",
            top: "10px"
          }}
        >
          R
        </span>
      </div>
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "30px" }}
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
)(Pan);
