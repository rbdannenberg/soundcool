import React from "react";
import store from "../../index";
import "../../index.css";
import { ProgressBar } from "react-bootstrap";
import { FaPlay, FaSquare } from "react-icons/fa";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  fontSize: "10px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
};

const Player = ({ blockInfo }) => {
  let { id, speed, volume, file } = blockInfo;
  return (
    <React.Fragment>
      <div className="row">
        <div className="text-center col" style={{ width: "14rem" }}>
          <div style={{ fontSize: "0.8rem" }}>Speed</div>
          <input
            className="slider mx-1 my-2 text-center"
            type="range"
            style={{ width: "10rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "speed",
                value: e.target.value
              });
            }}
            min={0}
            max={2}
            step={0.1}
            value={speed}
            id="speed"
          />
          <div className="text-center mx-1">
            <span className="float-left" style={{ fontSize: "0.8rem" }}>
              x0
            </span>
            <span className="float-center" style={{ fontSize: "0.8rem" }}>
              x1
            </span>
            <span className="float-right" style={{ fontSize: "0.8rem" }}>
              x2
            </span>
          </div>

          <ProgressBar now={60} style={{ width: "10rem" }} className="mx-2" />

          <label htmlFor="loop" style={{ fontSize: "0.8rem" }}>
            Loop
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="loop"
            onClick={() => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "loop",
                value: undefined
              });
            }}
          />

          <span className="text-center">
            <button
              className="btn btn-light m-1"
              style={circleStyle}
              onClick={e => {
                store.dispatch({
                  type: "CHANGE_BLOCK",
                  id: id,
                  field: "playing",
                  value: undefined
                });
              }}
            >
              <FaPlay style={{ fontSize: "0.5rem" }} />
            </button>
            <button
              className="btn btn-light btn-circle m-1"
              style={circleStyle}
              onClick={() => {
                // let x = 0 - sliderCents;
                store.dispatch({
                  type: "CHANGE_BLOCK",
                  id: id,
                  field: "playing",
                  value: undefined
                  // relative: false
                });
              }}
            >
              <FaSquare style={{ fontSize: "0.5rem" }} />
            </button>
            <button
              className="btn btn-light btn-circle m-1"
              style={circleStyle}
              onClick={e => {
                // let x = buttonCents + 100;
                store.dispatch({
                  type: "CHANGE_BLOCK",
                  id: id,
                  field: "playing",
                  value: undefined
                });
              }}
            >
              <FaPlay style={{ fontSize: "0.5rem" }} />
            </button>
          </span>
        </div>
        <div className="col" style={{ width: "2rem" }}>
          <div style={{ fontSize: "0.8rem" }}>{"Vol. " + volume} </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{ width: "1.5rem", height: "7rem" }}
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
      <div className="text-center">
        <div className="row">
          <input
            className="mx-4"
            style={{ fontSize: "0.8rem" }}
            type="file"
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id,
                field: "file",
                value: e.target.files[0]
              });
            }}
          />
        </div>
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

export default Player;
