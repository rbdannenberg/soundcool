
import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio, getAudio, youtubeAudio } from "../sounds/actions";


const circleStyle = {
  width: "6rem",
  height: "3rem",
  textAlign: "center",
  padding: "10px",
  fontSize: "1.2rem",
  borderRadius: "1.25rem",
  borderColor: "black",
  position: "absolute", // Add position absolute
  top: "70%", // Center vertically
  left: "70%", // Center horizontally
  transform: "translate(-15%, 500%)" // Adjust to center perfectly
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
  //  console.log(this.props, 'blockinfo')
    let { audioObj } = this.props.blockInfo;
  //  audioObj = audioObj || {};
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
    const height = 150;
    const width = 25;

    let x = audioObj.getAudioData()[0];
    // console.log(x); // in db, [-100, 10]
    let data = Math.max(this.oldDb - 7, x, -100);
    let scaledData = data;
    if (data >= -45) {
      scaledData = 0.1 * height + ((data + 45) / 55) * (0.9 * height);
    } else {
      scaledData = ((data + 100) / 55) * (0.1 * height);
    }

    // let scaledData = 150;
    renderCtx.clearRect(0, 0, width, height);

    var grd = renderCtx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.25, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, height - scaledData, width, scaledData);
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
    console.log(audioObj);
    if(audioObj.loadPromise) {
      audioObj.loadPromise.then((res) => {
        if(res === 'missing sound') {
          file.no = true;
        }
        else {
          file.no = false;
        }
      })
    }
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
        <div
          className=""
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "pink"
          }}
        >
          
          <div
            style={{
              fontSize: "1.8rem", 
              position: "absolute",
              top: "200px",
              left: "68px" // Increase the left offset
            }}
          >
             Speed: {Math.round(speed * 100) / 100}
          </div>

          <input
            className="slider mx-1 my-2 text-center"
            type="range"
            style={{
              width: "63rem", // Increase the width
              position: "absolute",
              left: "4.3125rem",
              top: "240px"
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
              fontSize: "2rem", // Increase the font size
              position: "absolute",
              top: "60px" // Increase the top offset
            }}
          >
            <div
              className=""
              style={{
                position: "absolute",
                top: "13rem",
                left: "4.7rem", // Increase the left offset
                cursor: "pointer",
                border: "1px solid",
                width: "2rem", // Increase the width
                fontSize: "2rem" // Increase the font size
              }}
              onClick={e => this.props.changeBlock(id, "speed", 0.01)}
            >
              &#215;0.01
            </div>
            <div
              className=""
              style={{
                position: "absolute",
                top: "13rem",
                left: "34.7rem", // Increase the left offset
                cursor: "pointer",
                border: "1px solid",
                width: "2.2rem", // Increase the width
                fontSize: "2rem" // Increase the font size
              }}
              onClick={e => this.props.changeBlock(id, "speed", 1)}
            >
              &#215;1
            </div>
            <div
              className=""
              style={{
                position: "absolute",
                top: "13rem",
                left: "64.7rem", // Increase the left offset
                cursor: "pointer",
                border: "1px solid",
                width: "2rem", // Increase the width
                fontSize: "2rem" // Increase the font size
              }}
              onClick={e => this.props.changeBlock(id, "speed", 2)}
            >
              &#215;2
            </div>
          </div>

          <div
            className="progress"
            style={{
              width: "62rem", // Increase the width
              position: "absolute",
              top: "340px", // Increase the top offset
              left: "5rem",
              backgroundColor: "black",
              height: "18px" // Increase the height
            }}
          >
            <canvas
              style={{ position: "relative", width: "100%", height: "100%" }}
              ref={this.canvasSeekRef}
            />
          </div>

          <div
            style={{
              fontSize: "1rem", // Increase the font size
              textAlign: "right",
              position: "absolute",
              top: "360px", // Increase the top offset
              right: "23rem" // Increase the right offset
            }}
          >
            {(isNaN(hour) ? "00" : hour) +
              ":" +
              (isNaN(minute) ? "00" : minute) +
              ":" +
              (isNaN(second) ? "00" : second)}
          </div>

          <span
            className="text-center"
            style={{ position: "absolute", top: "140px" }} // Increase the top offset
          >
            <label
              htmlFor="loop"
              style={{
                fontSize: "2rem", // Increase the font size
                position: "absolute",
                left: "5rem",
                top: "22.25rem"
              }}
            >
              Loop
            </label>
            <input
              checked={blockInfo.audioObj.options.loop}
              type="checkbox"
              className=""
              id="loop"
              style={{
                position: "absolute",
                left: "11.375rem",
                top: "22.9rem",
                transform: "scale(3.5)" // Increase the scale factor as needed
              }}
              onClick={() =>
                this.props.changeBlock(id, "loop", !audioObj.options.loop)
              }
            />

            <button
              disabled={blockInfo.inDisabled}
              className="btn btn-light m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "5.0625rem" // Increase the left offset
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
                    fontSize: "1rem" // Increase the font size
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
              disabled={blockInfo.inDisabled}
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "990px"
              }}
              onClick={() => {
                audioObj.stop();
                this.props.changeBlock(id, "playing", undefined);

              }}
            >
              <FaSquare style={{ fontSize: "1rem" }} />{" "}
              {/* Increase the font size */}
            </button>
            <button
              disabled={blockInfo.inDisabled}
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "530px" // Increase the left offset
              }}
              onClick={() => {
                audioObj.reverse(res => {
                  // console.log(res);
                });
              }}
            >
              <FaPlay
                style={{
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
              left: "70.8125rem", // Increase the left offset
              top: "15.875rem",
              minHeight: "120px", // Increase the min-height
              width: "30px", // Increase the width
              backgroundColor: "black"
            }}
          >
            <canvas
              ref={this.canvasMeterRef}
              style={{
                height: "330px" // Increase the height
              }}
            />
          </div>

          <div
            style={{
              fontSize: "2rem", // Increase the font size
              position: "absolute",
              left: "73.5rem", // Increase the left offset
              top: "600px",
              width: "11rem" // Increase the width
            }}
          >
            {"Vol. " + blockInfo.volume}
          </div>
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{
              width: "25%", // Adjust the width
              height: "6%", // Adjust the height
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              position: "absolute", // Add position:absolute
              left: "64rem", // Adjust the left position as needed
              top: "24rem" /// Set the rotation origin to the center
            }}
            onChange={e => this.props.changeBlock(id, "volume", e.target.value)}
            min={0}
            max={100}
            step={1}
            value={blockInfo.volume}
            id="volume"
          />
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

