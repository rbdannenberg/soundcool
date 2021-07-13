import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio, getAudio, youtubeAudio } from "../sounds/actions";

const circleStyle = {
  width: "1.2rem",
  height: "1.2rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "0.64rem",
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
      // console.log("seeking...");
      var rect = canvas.getBoundingClientRect();
      window.rect = rect;
      let pos = e.clientX - rect.left;
      window.e = e;
      let seek = pos / (rect.right - rect.left);
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
      // console.log(audioObj.options.loop);
      // fill width = 300 is a hack, since 190 is supposed to be the length of
      // render bar, but when fill in a length of 190, it doesn't really
      // fill in to the rightmost end.
      if (audioObj.isPlaying) {
        renderCtx.clearRect(0, 0, canvas.width, canvas.height);
        //Commented by Amit
        // this.props.changeBlock(this.id, "playedTime", 0);
        let data =
          (audioObj.options.speed *
            (audioObj.context.currentTime - audioObj.startTime)) %
          audioObj.duration;
        let step = canvas.width / audioObj.duration;
        if (audioObj.options.reverse) {
          renderCtx.fillRect(0, 0, canvas.width - data * step, 140);
          this.props.changeBlock(
            this.id,
            "playedTime",
            audioObj.duration - data
          );
        } else {
          if (playedTime !== data)
            this.props.changeBlock(this.id, "playedTime", data);
          renderCtx.fillRect(0, 0, data * step, 140);
        }
      } else if (audioObj.isPaused) {
      } else {
        renderCtx.clearRect(0, 0, canvas.width, 140);
        if (playedTime !== 0) this.props.changeBlock(this.id, "playedTime", 0);
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

  async getAudioUrl(sound_id) {
    if (!this.state[sound_id]) {
      this.state[sound_id] = 1;
      await getAudio(sound_id).then(res => {
        this.setState({ [sound_id]: res["location"] });
      });
    }
  }

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
        this.props.blockInfo.URL = url;
        if (inDisabled) this.props.changeBlock(id, "inDisabled", false);
      });
    };

    const onSoundSelect = sound => {
      audioObj.stop();
      this.props.changeBlock(id, "file", sound);
      let { type, sound_id } = sound;
      if (type === "Sound Link") {
        getAudio(sound_id).then(res => {
          loadUrl(res["location"]);
        });
      } else if (type === "Youtube") {
        loadUrl(youtubeAudio(sound_id));
      } else {
        loadUrl(serveAudio(sound_id));
      }
    };

    const timeFormat = time => {
      if (isNaN(time) || time === "NaN") {
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
        <div className="" style={{ position: "relative", height: "6.25rem" }}>
          <div
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "8px"
            }}
          >
            Speed: {Math.round(speed * 100) / 100}
          </div>
          <input
            className="slider mx-1 my-2 text-center"
            type="range"
            style={{
              width: "10rem",
              position: "absolute",
              left: "0.3125rem",
              top: "2px"
            }}
            onChange={e => this.props.changeBlock(id, "speed", e.target.value)}
            min={0.01}
            max={2}
            step={0.01}
            value={speed}
            id="speed"
          />
          <div
            className="text-center mx-1"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "30px"
            }}
          >
            <div
              className=""
              style={{
                position: "absolute",
                left: "0.3125rem",
                cursor: "pointer",
                border: "1px solid",
                width: "2rem",
                fontSize: "0.64rem"
              }}
              onClick={e => this.props.changeBlock(id, "speed", 0.01)}
            >
              &#215;0.01
            </div>
            <div
              className=""
              style={{
                position: "absolute",
                left: "4.7rem",
                cursor: "pointer",
                border: "1px solid",
                width: "1.25rem",
                fontSize: "0.64rem"
              }}
              onClick={e => this.props.changeBlock(id, "speed", 1)}
            >
              &#215;1
            </div>
            <div
              className=""
              style={{
                position: "absolute",
                left: "9rem",
                cursor: "pointer",
                border: "1px solid",
                width: "1.25rem",
                fontSize: "0.64rem"
              }}
              onClick={e => this.props.changeBlock(id, "speed", 2)}
            >
              &#215;2
            </div>
          </div>

          <div
            className="progress"
            style={{
              width: "10.2rem",
              position: "absolute",
              top: "52px",
              left: "0.5rem",
              backgroundColor: "black",
              height: "12px"
            }}
          >
            <canvas
              style={{ position: "relative", width: "100%", height: "100%" }}
              ref={this.canvasSeekRef}
            />
          </div>

          <div
            style={{
              fontSize: "0.64rem",
              textAlign: "right",
              position: "absolute",
              top: "64px",
              right: "2.2rem"
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
            style={{ position: "absolute", top: "73px" }}
          >
            <label
              htmlFor="loop"
              style={{
                fontSize: "0.64rem",
                position: "absolute",
                left: "0.5rem",
                top: "0.25rem"
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
                left: "2.375rem",
                top: "0.25rem"
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
                left: "4.0625rem"
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
                    fontSize: "0.64rem"
                  }}
                />
              )}
              {audioObj.isPlaying && (
                <FaPause
                  style={{
                    fontSize: "0.64rem",
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
                left: "96px"
              }}
              onClick={() => {
                audioObj.stop();
                this.props.changeBlock(id, "playing", undefined);
              }}
            >
              <FaSquare style={{ fontSize: "0.64rem" }} />
            </button>
            <button
              disabled={inDisabled}
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "128px"
              }}
              onClick={() => {
                audioObj.reverse(res => {
                  // console.log(res);
                });
              }}
            >
              <FaPlay
                style={{
                  //fontSize: "0.64",
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
              left: "10.8125rem",
              top: "0.875rem",
              minHeight: "80px",
              width: "12px",
              backgroundColor: "black"
            }}
          >
            <canvas ref={this.canvasMeterRef} />
          </div>

          <div
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "10.5rem",
              top: "-1px",
              width: "2.4rem"
            }}
          >
            {"Vol. " + volume}
          </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{
              width: "1.5rem",
              height: "80px",
              position: "absolute",
              left: "11.5625rem",
              top: "0.875rem"
            }}
            onChange={e => this.props.changeBlock(id, "volume", e.target.value)}
            min={0}
            max={100}
            step={1}
            value={volume}
            id="volume"
          />
        </div>
        <div className="text-center" style={{ backgroundColor: "grey" }}>
          <AddSound onSoundSelect={onSoundSelect} file={file} />

          {!this.props.blockInfo.oscPort ? (
            <div>
              <label
                htmlFor="osc"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                OSC
              </label>
              <input
                type="checkbox"
                className="m-1"
                id="osc"
                onClick={() => this.props.changeBlock(id, "osc", undefined)}
              />
              <span className="col text-center">
                <label
                  htmlFor="oscPort"
                  style={{ fontSize: "0.64rem", marginBottom: "0" }}
                >
                  OSC port:
                </label>
                <input
                  type="text"
                  className=""
                  style={{
                    height: "1.2rem",
                    width: "2.4rem",
                    fontSize: "0.64rem"
                  }}
                  id="oscPort"
                  onChange={e =>
                    this.props.changeBlock(id, "oscPort", e.target.value)
                  }
                />
              </span>
            </div>
          ) : (
            <div>
              <span className="col text-center">
                <label
                  htmlFor="oscPort"
                  style={{ fontSize: "0.64rem", marginBottom: "0" }}
                >
                  {"osc port: " + this.props.blockInfo.oscPort}
                </label>
              </span>
            </div>
          )}
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
export default connect(mapStateToProps, { changeBlock })(Player);
