import React from "react";
import store from "../../index";

const Delay = ({ blockInfo }) => {
  let { id, delayTime, feedback } = blockInfo;
  return (
    <React.Fragment>
      <div className="">
        <input
          className="slider mx-2 my-1"
          type="range"
          style={{ width: "8rem" }}
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "delayTime",
              value: e.target.value
            });
          }}
          min={0}
          max={100}
          value={delayTime}
          id="delayTime"
        />
        <label htmlFor="delayTime" style={{ fontSize: "0.8rem" }}>
          {"delay(ms): " + delayTime}
        </label>
        <input
          className="slider mx-2 my-1"
          type="range"
          style={{ width: "8rem" }}
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "feedback",
              value: e.target.value
            });
          }}
          step={0.001}
          min={0}
          max={1}
          value={feedback}
          id="feedback"
        />
        <label htmlFor="feedback" style={{ fontSize: "0.8rem" }}>
          {"feedback: " + feedback}
        </label>
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

export default Delay;
