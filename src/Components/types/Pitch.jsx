import React from "react";
import store from "../../index";

const Pitch = ({ blockInfo }) => {
  let { id, cents } = blockInfo;
  return (
    <React.Fragment>
      <div className="text-center">
        <label
          htmlFor="cents"
          className="float-right mx-2"
          style={{ fontSize: "0.8rem" }}
        >
          {"Cents: " + cents}
        </label>
        <div className="text-center">
          <input
            className="slider mx-2"
            type="range"
            style={{ width: "15rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "cents",
                value: e.target.value
              });
            }}
            min={-50}
            max={50}
            value={cents}
            id="cents"
          />
          <div className="mx-2">
            <span className="float-left" style={{ fontSize: "0.8rem" }}>
              -400
            </span>
            <span className="float-center" style={{ fontSize: "0.8rem" }}>
              0
            </span>
            <span className="float-right" style={{ fontSize: "0.8rem" }}>
              +400
            </span>
          </div>
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

export default Pitch;
