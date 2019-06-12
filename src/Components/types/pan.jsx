import React from "react";
import store from "../../index";

const Pan = ({ blockInfo }) => {
  let { id, direction } = blockInfo;
  return (
    <React.Fragment>
      <div class="text-center card-body">
        {/* <div className="row"> */}
        <span>L</span>
        <input
          className="slider m-2"
          type="range"
          style={{ width: "18rem" }}
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "direction",
              value: e.target.value
            });
          }}
          min={-50}
          max={50}
          value={direction}
          id="direction"
        />
        <span>R</span>
        {/* </div> */}
      </div>
      <div className="card-footer row">
        <span className="col-md-4">
          <label htmlFor="kinect">Kinect</label>
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
          <label htmlFor="osc">OSC port:</label>
          <input
            type="text"
            className="col-md-6 m-2"
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

export default Pan;
