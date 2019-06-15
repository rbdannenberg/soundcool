import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";
import { FaPlay, FaSquare } from "react-icons/fa";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
};

const Player = ({ blockInfo }) => {
  let { id, speed } = blockInfo;
  return (
    <React.Fragment>
      <div class="card-body">
        <div>Speed</div>
        <input
          className="slider m-2 text-center"
          type="range"
          style={{ width: "20rem" }}
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
        <div className="text-center">
          <span className="float-left"> x0 </span>
          <span className="float-center"> x1 </span>
          <span className="float-right"> x2 </span>
        </div>

        <ProgressBar now={60} />

        <label htmlFor="loop">Loop</label>
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
            className="btn btn-light mx-4 my-2"
            style={circleStyle}
            onClick={e => {
              // let x = buttonCents - 100;
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "playing",
                value: undefined
              });
            }}
          >
            <FaPlay />
          </button>
          <button
            className="btn btn-light btn-circle mx-4 my-2"
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
            <FaSquare />
          </button>
          <button
            className="btn btn-light btn-circle mx-4 my-2"
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
            <FaPlay />
          </button>
        </span>
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

export default Player;
