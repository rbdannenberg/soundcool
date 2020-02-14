import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare, FaPause, FaWindows } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio } from "../sounds/actions";
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
    this.canvasMeterRef = React.createRef();
    this.canvasSeekRef = React.createRef();
    this.rendererM = undefined;
    this.rendererS = undefined;
    this.oldDb = -100;
    this.state = { isLoaded: false, isPlaying: false };
    this.id = this.props.blockInfo.id;
  }

  componentDidMount = () => {
    let { audioObj } = this.props.blockInfo;
    this.rendererP = setInterval(this.rendererMeter.bind(this), 200);
    this.rendererS = setInterval(this.rendererSeek.bind(this), 200);
    var canvas = this.canvasSeekRef.current;
    const seek = (canvas, e) => {
      // if user seek when audio is not starting, we need to make sure
      // audio don't start after seek
      // the audioObj.seek function will assume a playing state and resume playing
      // if (audioObj.isPlaying) {
      console.log("seeking...");
      var rect = canvas.getBoundingClientRect();
      window.rect = rect;
      let pos = e.clientX - rect.left;
      window.e = e;
      let seek = pos / 190;
      audioObj.seek(seek);
      // }
    };
    canvas.addEventListener("click", function(e) {
      seek(canvas, e);
    });
  };

  rendererSeek = () => {
    let { audioObj, file, playedTime } = this.props.blockInfo;
    if (file) {
      let canvas = this.canvasSeekRef.current;
      if (canvas === null) {
        clearInterval(this.rendererS);
        return;
      }
      let canvasCtx = canvas.getContext("2d");
      let renderCtx = canvasCtx;
      renderCtx.fillStyle = "blue";
      // fill width = 300 is a hack, since 190 is supposed to be the length of
      // render bar, but when fill in a length of 190, it doesn't really
      // fill in to the rightmost end.
      if (audioObj.isPlaying) {
        renderCtx.clearRect(0, 0, 190, 140);
        //Commented by Amit
        // this.props.changeBlock(this.id, "playedTime", 0);
        let data =
          (audioObj.options.speed *
            (audioObj.context.currentTime - audioObj.startTime)) %
          audioObj.duration;
        let step = 190 / audioObj.duration;
        if (audioObj.options.reverse) {
          renderCtx.fillRect(0, 0, 190 - data * step, 140);
          this.props.changeBlock(
            this.id,
            "playedTime",
            audioObj.duration - data
          );
        } else {
          if (playedTime != data)
            this.props.changeBlock(this.id, "playedTime", data);
          renderCtx.fillRect(0, 0, data * step, 140);
        }
      } else if (audioObj.isPaused) {
      } else {
        renderCtx.clearRect(0, 0, 190, 140);
        if (playedTime != 0) this.props.changeBlock(this.id, "playedTime", 0);
      }
    }
  };

  rendererMeter = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasMeterRef.current;
    // console.log(this.canvasMeterRef);
    if (canvas === null) {
      clearInterval(this.rendererP);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getAudioData()[0];
    // console.log(x);
    let data = Math.max(this.oldDb - 7, x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 50, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 50, 0, 150);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.2, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 150 - scaledData, 15, scaledData);
  };

  render() {
    let {
      id,
      speed,
      volume,
      playedTime,
      file,
      inDisabled,
      audioObj
    } = this.props.blockInfo;

    const loadUrl = url => {
      audioObj.load(url).then(res => {
        if (inDisabled) this.props.changeBlock(id, "inDisabled", false);
        console.log(res);
      });
    };

    const onSoundSelect = audio_id => {
      audioObj.stop();
      this.props.changeBlock(id, "file", audio_id);
      const url = serveAudio(audio_id.sound_id);
      loadUrl(url);
    };

    const timeFormat = time => {
      if (time === NaN || time == "NaN") {
        return "00";
      }
      time = parseInt(time);
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    };

    let hour = timeFormat(playedTime / 3600);
    let minute = timeFormat((playedTime - hour * 3600) / 60);
    let second = timeFormat(playedTime - hour * 3600 - minute * 60);

    return (
      <React.Fragment>
        <div className="" style={{ position: "relative", height: "140px" }}>
          <div
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "10px"
            }}
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
            onChange={e => this.props.changeBlock(id, "speed", e.target.value)}
            min={0}
            max={2}
            step={0.1}
            value={speed}
            id="speed"
          />
          <div
            className="text-center mx-1"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              top: "36px"
            }}
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
              top: "60px",
              left: "8px",
              backgroundColor: "black"
            }}
          >
            <canvas style={{ position: "relative" }} ref={this.canvasSeekRef} />
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              textAlign: "right",
              position: "absolute",
              top: "80px",
              right: "110px"
            }}
          >
            {(isNaN(hour) ? "00" : hour) +
              ":" +
              (isNaN(minute) ? "00" : minute) +
              ":" +
              (isNaN(second) ? "00" : second)}
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
              checked={audioObj.options.loop}
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
              onClick={() =>
                this.props.changeBlock(id, "loop", !audioObj.options.loop)
              }
            />

            <button
              disabled={inDisabled}
              className="btn btn-light m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "78px"
              }}
              onClick={() => {
                audioObj.isPlaying
                  ? audioObj.pause()
                  : audioObj.play(() => {
                      this.setState({});
                    });
                this.props.changeBlock(id, "playing", undefined);
              }}
            >
              {!audioObj.isPlaying && (
                <FaPlay
                  style={{
                    fontSize: "12px",
                    marginLeft: "2.5px"
                  }}
                />
              )}
              {audioObj.isPlaying && (
                <FaPause
                  style={{
                    fontSize: "12px",
                    marginLeft: "0px"
                  }}
                />
              )}
            </button>
            <button
              disabled={inDisabled}
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "120px"
              }}
              onClick={() => {
                audioObj.stop();
                this.props.changeBlock(id, "playing", undefined);
              }}
            >
              <FaSquare style={{ fontSize: "12px" }} />
            </button>
            <button
              disabled={inDisabled}
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "160px"
              }}
              onClick={() => {
                audioObj.reverse(res => {
                  console.log(res);
                });
              }}
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
              left: "235px",
              top: "30px",
              height: "100px",
              width: "15px",
              backgroundColor: "black"
            }}
          >
            <canvas ref={this.canvasMeterRef} />
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "260px",
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
              left: "268px",
              top: "26px"
            }}
            onChange={e => this.props.changeBlock(id, "volume", e.target.value)}
            min={0}
            max={1}
            step={0.01}
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
              onClick={() => this.props.changeBlock(id, "kinect", undefined)}
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
              onChange={e => this.props.changeBlock(id, "osc", e.target.value)}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(
  mapStateToProps,
  { changeBlock }
)(Player);
