import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";

const DirectInput = ({ blockInfo }) => {
  let { id, direction, volume } = blockInfo;
  return (
    <React.Fragment>
      <div className="row">
        <div className="text-center col mx-2" style={{ width: "14rem" }}>
          <div className="text-center">
            <div style={{ fontSize: "0.8rem" }}>Pan</div>
            <span style={{ fontSize: "0.8rem" }}>L</span>
            <input
              className="slider m-2"
              type="range"
              style={{ width: "9rem" }}
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
          <div className=" text-center mx-2 my-2">
            <ProgressBar now={60} style={{ width: "10rem" }} />
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
        </div>
        <div className="col" style={{ width: "2rem" }}>
          <div style={{ fontSize: "0.8rem" }}>{"Vol. " + volume} </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{ width: "1.5rem", height: "6rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "volume",
                value: e.target.value
              });
            }}
            min={0}
            max={100}
            step={1}
            value={volume}
            id="volume"
          />
        </div>
      </div>

      <div className="row">
        <div className="col m-1">
          <button
            className="btn btn-light "
            style={{ fontSize: "0.6rem", width: "6rem" }}
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
        </div>
        <div className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className=" m-1"
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default DirectInput;
