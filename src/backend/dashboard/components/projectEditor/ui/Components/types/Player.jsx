import React from "react";
import changeBlock from "../../../handlers";
import { FaPlay, FaSquare } from "react-icons/fa";
import AddSound from "../../../../addSound";
import { showToastr } from "../../../../common";
import { serveAudio } from "../../../../sounds/actions";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "10px",
  // lineHeight: 1.428571429,
  borderRadius: "1rem",
  borderColor: "black"
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      id,
      speed,
      volume,
      hour,
      minute,
      second,
      file
    } = this.props.blockInfo;
    let audio;
    if(file){
      audio = new Audio(serveAudio(file.sound_id));
    }
    const onSoundSelect = audio_id => {
      changeBlock(id, "file", audio_id);
    };
    const playMusic = () => {
      audio.play();
    };
    return (
      <React.Fragment>
        <div className="" style={{ position: "relative", height: "140px" }}>
          <div
            style={{ fontSize: "0.8rem", position: "absolute", left: "10px" }}
          >
            Speed
          </div>
          <input
            className="slider mx-1 my-2 text-center"
            type="range"
            style={{
              width: "190px",
              position: "absolute",
              left: "5px",
              top: "12px"
            }}
            onChange={e => changeBlock(id, "speed", e.target.value)}
            min={0}
            max={2}
            step={0.1}
            value={speed}
            id="speed"
          />
          <div
            className="text-center mx-1"
            style={{ fontSize: "0.8rem", position: "absolute", top: "36px" }}
          >
            <span className="" style={{ position: "absolute", left: "5px" }}>
              x0
            </span>
            <span className="" style={{ position: "absolute", left: "92px" }}>
              x1
            </span>
            <span className="" style={{ position: "absolute", left: "180px" }}>
              x2
            </span>
          </div>

          <div
            className="progress"
            style={{
              width: "190px",
              position: "absolute",
              left: "8px",
              top: "60px",
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
            style={{
              fontSize: "0.8rem",
              textAlign: "right",
              position: "absolute",
              top: "80px",
              right: "85px"
            }}
          >
            {hour + ":" + minute + ":" + second}
          </div>

          {/* check and buttons */}
          <span
            className="text-center"
            style={{ position: "absolute", top: "100px" }}
          >
            <label
              htmlFor="loop"
              style={{
                fontSize: "0.8rem",
                position: "absolute",
                left: "10px",
                top: "4px"
              }}
            >
              Loop
            </label>
            <input
              type="checkbox"
              className=""
              id="loop"
              style={{
                position: "absolute",
                left: "45px",
                top: "5px",
                height: "20px",
                width: "20px"
              }}
              onClick={() => changeBlock(id, "loop", undefined)}
            />

            <button
              className="btn btn-light m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "78px"
              }}
              onClick={playMusic}
            >
              <FaPlay style={{ fontSize: "12px", marginLeft: "2.5px" }} />
            </button>
            <button
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "120px"
              }}
              onClick={() => audio.pause()}
            >
              <FaSquare style={{ fontSize: "12px" }} />
            </button>
            <button
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "160px"
              }}
              onClick={() => changeBlock(id, "reversed", undefined)}
            >
              <FaPlay
                style={{
                  fontSize: "12px",
                  marginLeft: "-2px",
                  transform: "scaleX(-1)"
                }}
              />
            </button>
          </span>

          <div
            className="progress progress-bar-vertical"
            style={{
              position: "absolute",
              left: "220px",
              top: "25px",
              height: "110px",
              width: "15px",
              backgroundColor: "black"
            }}
          >
            <div
              className="progress-bar "
              role="progressbar"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "60%", backgroundColor: "green" }}
            />
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "230px",
              top: "5px"
            }}
          >
            {"Vol. " + volume}{" "}
          </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{
              width: "1.5rem",
              height: "110px",
              position: "absolute",
              left: "248px",
              top: "26px"
            }}
            onChange={e => changeBlock(id, "volume", e.target.value)}
            min={0}
            max={100}
            step={1}
            value={volume}
            id="volume"
          />
        </div>
        <div className="text-center" style={{ backgroundColor: "grey" }}>
          <AddSound onSoundSelect={onSoundSelect} file={file} />

          <span className="col text-center">
            <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
              Kinect
            </label>
            <input
              type="checkbox"
              className="m-1"
              id="kinect"
              onClick={() => changeBlock(id, "kinect", undefined)}
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
              onChange={e => changeBlock(id, "osc", e.target.value)}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Player;
