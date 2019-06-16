import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: 1.428571429,
  borderRadius: "0.5rem"
};

const Player = ({ blockInfo }) => {
  let { id, muted } = blockInfo;
  let playButton;
  if (muted) {
    playButton = <FaVolumeUp />;
  } else {
    playButton = <FaVolumeMute />;
  }
  return (
    <React.Fragment>
      <div class="text-center">
        <div className="container my-2">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-1" style={{ fontSize: "0.8rem" }}>
                  L
                </div>
                <div className="col-7">
                  <ProgressBar now={60} style={{ width: "8rem" }} />
                </div>
              </div>
              <div className="row">
                <div className="col-1" style={{ fontSize: "0.8rem" }}>
                  R
                </div>
                <div className="col-7">
                  <ProgressBar now={60} style={{ width: "8rem" }} />
                </div>
              </div>
            </div>
            <div className="col-4">
              <button
                className="btn btn-light "
                style={circleStyle}
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
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="col-md-4">
          <button
            className="btn btn-light mx-2 my-1"
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
        </span>
      </div>
    </React.Fragment>
  );
};

export default Player;
