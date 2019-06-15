import React from "react";
import store from "../../index";
import { ProgressBar } from "react-bootstrap";
import { Row } from "reactstrap";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const circleStyle = {
  width: "4rem",
  height: "4rem",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
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
      <div class="card-body">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-1">L</div>
                <div className="col-7">
                  <ProgressBar now={60} style={{ width: "10rem" }} />
                </div>
              </div>
              <div className="row">
                <div className="col-1">R</div>
                <div className="col-7">
                  <ProgressBar now={60} style={{ width: "10rem" }} />
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
        </span>
      </div>
    </React.Fragment>
  );
};

export default Player;
