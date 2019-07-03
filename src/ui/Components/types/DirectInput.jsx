import React from "react";
import store from "../../../index";
import changeBlock from "../../../handlers";
import { ProgressBar } from "react-bootstrap";

const DirectInput = ({ blockInfo }) => {
  let { id, direction, volume } = blockInfo;
  return (
    <React.Fragment>
      <div className="" style={{ position: "relative", height: "100px" }}>
        <div
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "0px",
            left: "100px"
          }}
        >
          Pan
        </div>
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "15px",
            top: "18px"
          }}
        >
          L
        </span>
        <input
          className="slider"
          type="range"
          style={{
            width: "178px",
            position: "absolute",
            left: "26px",
            top: "20px"
          }}
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
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "214px",
            top: "18px"
          }}
        >
          R
        </span>

        <div
          className="progress"
          style={{
            width: "200px",
            position: "absolute",
            top: "42px",
            left: "15px",
            backgroundColor: "black"
          }}
        >
          <div
            className="progress-bar "
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "60%", backgroundColor: "green" }}
          />
        </div>

        <div
          className="text-center"
          style={{ position: "absolute", top: "68px" }}
        >
          <label
            htmlFor="muted"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "15px",
              top: "2px"
            }}
          >
            MUTE
          </label>
          <input
            type="checkbox"
            className="my-1"
            id="muted"
            style={{ position: "absolute", left: "55px" }}
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "muted",
                value: undefined
              });
            }}
          />
          <label
            htmlFor="channel"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "75px",
              top: "2px"
            }}
          >
            Channel:
          </label>
          <input
            type="text"
            className=""
            style={{
              height: "1.5rem",
              width: "3rem",
              position: "absolute",
              left: "130px"
            }}
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
        {/* <div
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "230px",
            top: "5px"
          }}
        >
          {"Vol: " + volume}{" "}
        </div> */}
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.5rem",
            height: "90px",
            position: "absolute",
            left: "248px",
            top: "5px"
          }}
          onChange={e => changeBlock(id, "volume", e.target.value)}
          min={0}
          max={100}
          step={1}
          value={volume}
          id="volume"
        />
      </div>

      <div className="" style={{ backgroundColor: "grey", height: "32px" }}>
        <button
          className="badge-pill badge-light badge-sm mx-2 my-1"
          style={{ fontSize: "0.8rem" }}
        >
          Audio Settings
        </button>
        <span className="">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="m-1"
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
