import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";

const DirectInput = ({ blockInfo }) => {
  let { id, direction } = blockInfo;
  return (
    <React.Fragment>
      <div class="text-center">
        <div style={{ fontSize: "0.8rem" }}>Pan</div>
        <span style={{ fontSize: "0.8rem" }}>L</span>
        <input
          className="slider m-2"
          type="range"
          style={{ width: "13rem" }}
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
        <span style={{ fontSize: "0.8rem" }}>R</span>
      </div>
      <div className=" text-center mx-4 my-2">
        <ProgressBar now={60} style={{ width: "14rem" }} />
      </div>
      <div className=" text-center my-2">
        <label htmlFor="muted" style={{ fontSize: "0.8rem" }}>
          MUTE
        </label>
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
        <label htmlFor="channel" style={{ fontSize: "0.8rem" }}>
          Channel:
        </label>
        <input
          type="text"
          className="col-md-6 m-2"
          style={{ height: "1.5rem", width: "3rem" }}
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

      <div className="text-center row">
        <span className="col-md-4">
          <button
            className="btn btn-light m-1"
            style={{ fontSize: "0.8rem" }}
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
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="col-md-6 m-1"
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

export default DirectInput;
