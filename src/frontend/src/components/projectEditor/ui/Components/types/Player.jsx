import React from "react";
import changeBlock from "../../../handlers";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";
import AddSound from "../../../../addSound";
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
    this.canvasMeterRef = React.createRef();
    this.canvasSeekRef = React.createRef();
    this.rendererM = undefined;
    this.rendererS = undefined;
    this.oldDb = -100;
    this.state = { isLoaded: false };
  }

  componentDidMount = () => {
    this.rendererP = setInterval(this.rendererMeter.bind(this), 200);
    this.rendererS = setInterval(this.rendererSeek.bind(this), 100);
  };

  rendererSeek = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasSeekRef.current;
    if (canvas === null) {
      clearInterval(this.rendererS);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;

    renderCtx.fillStyle = "blue";
    if (audioObj.isPlaying) {
      renderCtx.clearRect(0, 0, 190, 140);
      let data =
        (audioObj.options.speed *
          (audioObj.context.currentTime - audioObj.startTime)) %
        audioObj.duration;
      let step = 190 / audioObj.duration;
      if(audioObj.options.reverse){
        renderCtx.fillRect(0, 0, 190-(data * step), 140);
      }else{
        renderCtx.fillRect(0, 0, data * step, 140);
      }
    } else if (audioObj.isPaused) {
    } else {
      renderCtx.clearRect(0, 0, 190, 140);
    }
  };

  rendererMeter = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasMeterRef.current;
    if (canvas === null) {
      clearInterval(this.rendererP);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getAudioData()[0];
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
      hour,
      minute,
      second,
      file,
      // disabled,
      audioObj
    } = this.props.blockInfo;

    const loadUrl = url => {
      audioObj.load(url).then(res => {
        let hour = parseInt(res / 3600);
        let minute = parseInt((res - hour * 3600) / 60);
        let second = parseInt(res - hour * 3600 - minute * 60);
        changeBlock(id, "second", second);
        changeBlock(id, "minute", minute);
        changeBlock(id, "hour", hour);
      });
    };

    if (file && !this.state.isLoaded) {
      const url = serveAudio(file.sound_id);
      loadUrl(url);
      this.setState({ isLoaded: true, isPlaying: false });
    }

    const onSoundSelect = audio_id => {
      audioObj.stop();
      changeBlock(id, "file", audio_id);
      const url = serveAudio(audio_id.sound_id);
      loadUrl(url);
    };
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
            onChange={e => changeBlock(id, "speed", e.target.value)}
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

          {/* <div
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
          </div> */}
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
            <canvas ref={this.canvasSeekRef} />
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
              onClick={() => {
                audioObj.isPlaying
                  ? audioObj.pause()
                  : audioObj.play(() => {
                      this.setState({});
                    });
                changeBlock(id, "playing", undefined);
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
                    marginLeft: "2.5px"
                  }}
                />
              )}
            </button>
            <button
              className="btn btn-light btn-circle m-1"
              style={{
                ...circleStyle,
                position: "absolute",
                left: "120px"
              }}
              onClick={() => {
                audioObj.stop();
                changeBlock(id, "playing", undefined);
              }}
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
              left: "220px",
              top: "30px",
              height: "100px",
              width: "15px",
              backgroundColor: "black"
            }}
          >
            <canvas ref={this.canvasMeterRef} />
          </div>
          {/* <div
              className="progress-bar "
              role="progressbar"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "60%", backgroundColor: "green" }}
            />
          </div> */}

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
