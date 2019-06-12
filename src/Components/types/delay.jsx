import React from "react";
import store from "../../index";

const Delay = ({ blockInfo }) => {
  let { id, delayTime, feedback } = blockInfo;
  return (
    <React.Fragment>
      <div className="card-body">
        <input
          className="slider m-2"
          type="range"
          style={{ width: "12rem" }}
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
        <label htmlFor="delayTime">{"delay(ms): " + delayTime}</label>
        <input
          className="slider m-2"
          type="range"
          style={{ width: "12rem" }}
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
        <label htmlFor="feedback">{"feedback: " + feedback}</label>
      </div>
      <div className="card-footer row">
        <span className="col-md-4">
          <label htmlFor="kinect">Kinect</label>
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
          <label htmlFor="osc">OSC port:</label>
          <input
            type="text"
            className="m-2"
            style={{ height: "1.5rem", width: "4rem" }}
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
