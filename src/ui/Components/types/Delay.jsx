import React from "react";
import store from "../../../index";

const Delay = ({ blockInfo }) => {
  let { id, delayTime, feedback } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "44px", position: "relative" }}
      >
        <input
          className="slider"
          type="range"
          style={{
            width: "128px",
            position: "absolute",
            top: "6px",
            left: "6px"
          }}
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
        <label
          htmlFor="delayTime"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "4px",
            left: "144px"
          }}
        >
          {"delay(ms): " + delayTime}
        </label>
        <input
          className="slider "
          type="range"
          style={{
            width: "128px",
            position: "absolute",
            top: "24px",
            left: "6px"
          }}
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
        <span
          htmlFor="feedback"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "22px",
            left: "144px"
          }}
        >
          {"feedback: " + feedback}
        </span>
      </div>
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "30px" }}
      >
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
            className="my-1"
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
