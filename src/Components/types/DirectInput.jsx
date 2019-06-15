import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";

const DirectInput = ({ blockInfo }) => {
  let { id, direction, muted, channel, osc } = blockInfo;
  return (
    <React.Fragment>
      <div class="text-center">
        <div>Pan</div>
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
      </div>
      <div className=" text-center mx-5 my-3">
        <ProgressBar now={60} style={{ width: "18rem" }} />
      </div>
      <div className=" text-center my-2">
        <label htmlFor="muted">MUTE</label>
        <input
          type="checkbox"
          className="m-1"
          id="muted"
          onClick={() => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "muted",
              value: undefined
            });
          }}
        />
        <label htmlFor="channel">OSC port:</label>
        <input
          type="text"
          className="col-md-6 m-2"
          style={{ height: "1.5rem", width: "4rem" }}
          id="channel"
          onChange={e => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "channel",
              value: e.target.value
            });
          }}
        />
      </div>

      <div className="card-footer row">
        <span className="col-md-4">
          <button
            className="btn btn-light mx-4 my-2"
            // onClick={e => {
            //   store.dispatch({
            //     type: "CHANGE_BLOCK",
            //     id: id,
            //     field: "muted",
            //     value: undefined
            //   });
            // }}
          >
            Audio Settings
          </button>
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

export default DirectInput;
