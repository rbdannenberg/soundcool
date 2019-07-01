import React from "react";
import store from "../../index";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  fontSize: "15px",
  lineHeight: 1.428571429,
  borderRadius: "0.5rem"
};

const Player = ({ blockInfo }) => {
  let { id, muted } = blockInfo;
  let playButton;
  if (muted) {
    playButton = <FaVolumeMute />;
  } else {
    playButton = <FaVolumeUp />;
  }
  return (
    <React.Fragment>
      <div class="text-center" style={{ position: "relative", height: "48px" }}>
        {/* L and R Progress Bars */}
        <div
          className=""
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "3px",
            left: "12px"
          }}
        >
          L
        </div>
        <div
          className="progress"
          style={{
            width: "230px",
            position: "absolute",
            top: "5px",
            left: "30px",
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
            top: "23px",
            left: "12px"
          }}
        >
          R
        </div>
        <div
          className="progress"
          style={{
            width: "230px",
            position: "absolute",
            top: "25px",
            left: "30px",
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

        {/* speaker icon button */}
        <button
          className="btn btn-light "
          style={{
            ...circleStyle,
            position: "absolute",
            padding: "0px",
            top: "5px",
            left: "270px",
            backgroundColor: "transparent"
          }}
          onClick={() => {
            store.dispatch({
              type: "CHANGE_BLOCK",
              id: id,
              field: "muted",
              value: undefined
            });
          }}
        >
          {playButton}
        </button>
      </div>

      <div className="text-center" style={{ backgroundColor: "grey" }}>
        <span className="col-md-4">
          <button
            className="badge-pill badge-light badge-sm mx-2 my-1"
            style={{ fontSize: "0.8rem" }}
          >
            Audio Settings
          </button>
        </span>
      </div>
    </React.Fragment>
  );
};

export default Player;
