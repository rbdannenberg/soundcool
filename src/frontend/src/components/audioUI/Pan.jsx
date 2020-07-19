import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

const Pan = ({ blockInfo, changeBlock }) => {
  let { id, panVal } = blockInfo;
  return (
    <React.Fragment>
      <div
        className="text-center"
        style={{ width: "230px", height: "32px", position: "relative" }}
      >
        <span
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "0.5rem",
            top: "10px"
          }}
        >
          L
        </span>
        <input
          className="slider mx-2"
          type="range"
          style={{
            width: "166px",
            position: "absolute",
            left: "0.7rem",
            top: "8px"
          }}
          step="0.1"
          onChange={e => changeBlock(id, "panVal", e.target.value)}
          min={-1}
          max={1}
          value={panVal}
          id="panVal"
        />
        <span
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            left: "12rem",
            top: "10px"
          }}
        >
          R
        </span>
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
)(Pan);
