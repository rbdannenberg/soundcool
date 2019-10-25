import React from "react";
import { store } from "../../../index";
import changeBlock from "../../../handlers";
import { FaCircle, FaSquare } from "react-icons/fa";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  fontSize: "14px",
  lineHeight: 1.428571429,
  borderRadius: "1rem",
  borderColor: "black"
};

const timing = x => {
  if (x.toString().length === 1) {
    return "0" + x;
  } else {
    return x;
  }
};

const Record = ({ blockInfo }) => {
  let { id, module, recording, volume, timer } = blockInfo;
  let hour = timing(timer / 3600);
  let minute = timing((timer / 60) % 60);
  let second = timing(timer % 60);
  let recordButton;
  if (!recording) {
    recordButton = (
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "180px"
        }}
      >
        <button
          className="btn btn-light "
          style={{
            ...circleStyle,
            position: "absolute",
            fontSize: "14px",
            padding: "0px",
            backgroundColor: "white"
          }}
          onClick={() => changeBlock(id, "recording", undefined)}
        >
          <FaCircle style={{ color: "red", marginTop: "-3px" }} />
        </button>
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "4px",
            left: "28px"
          }}
        >
          Record
        </span>
      </div>
    );
  } else {
    recordButton = (
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "180px"
        }}
      >
        <button
          className="btn btn-light "
          style={{
            ...circleStyle,
            position: "absolute",
            fontSize: "14px",
            padding: "0px",
            backgroundColor: "red"
          }}
          onClick={() => changeBlock(id, "recording", undefined)}
        >
          <FaSquare style={{ color: "white", marginTop: "-3px" }} />
        </button>
        <span
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "4px",
            left: "28px"
          }}
        >
          Stop
        </span>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div
        className="text-center"
        style={{ position: "relative", height: "88px" }}
      >
        <label
          htmlFor="fileName"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "6px",
            top: "4px"
          }}
        >
          {"File Name: "}
        </label>

        <input
          type="text"
          style={{
            position: "absolute",
            width: "70px",
            height: "16px",
            left: "70px",
            top: "5px",
            fontSize: "0.7rem"
          }}
          onChange={e => changeBlock(id, "fileName", e.target.value)}
        />

        {recordButton}

        {/* Progress Bars */}
        <div
          className=""
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "28px",
            left: "6px"
          }}
        >
          L
        </div>
        <div
          className="progress"
          style={{
            width: "270px",
            height: "15px",
            position: "absolute",
            top: "30px",
            left: "20px",
            backgroundColor: "black"
          }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "60%", backgroundColor: "green" }}
          />
        </div>

        <div
          className=""
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "48px",
            left: "6px"
          }}
        >
          R
        </div>
        <div
          className="progress"
          style={{
            width: "270px",
            height: "15px",
            position: "absolute",
            top: "50px",
            left: "20px",
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

        {/* Volume Slider */}
        <input
          className="slider"
          type="range"
          style={{
            width: "270px",
            position: "absolute",
            left: "20px",
            top: "70px"
          }}
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
          value={volume}
          id="volume"
        />
      </div>

      <div className="text-center" style={{ backgroundColor: "grey" }}>
        <div className="badge badge-fill badge-light badge-sm">
          {hour + ":" + minute + ":" + second}
        </div>
        <button
          className="badge-pill badge-light badge-sm mx-2 my-1"
          style={{ fontSize: "0.8rem" }}
          onClick={() => changeBlock(id, "module", undefined)}
        >
          {module ? "Module Input" : "Input Device"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Record;
