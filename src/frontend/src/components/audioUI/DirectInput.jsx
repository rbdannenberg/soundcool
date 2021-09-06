import React from "react";
import { connect } from "react-redux";
import { changeBlock } from "./actions";

class DirectInput extends React.Component {
  constructor(props) {
    super(props);
    this.oldDb = -100;
    this.canvasLRef = React.createRef();
    this.rendererL = undefined;
    this.micPermission = this.props.blockInfo.audioObj.micPermission;
  }

  renderAudioL = () => {
    let { audioObj } = this.props.blockInfo;
    let canvasL = this.canvasLRef.current;
    if (canvasL === null) {
      clearInterval(this.rendererL);
      return;
    }

    const width = 300;
    const height = 140;

    let canvasLCtx = canvasL.getContext("2d");
    let renderCtx = canvasLCtx;
    let x = audioObj.getAudioData();
    let data = Math.max(this.oldDb - 7, x, -100);
    let scaledData = data;
    if (data >= -45) {
      scaledData = 0.1 * width + ((data + 45) / 55) * (0.9 * width);
    } else {
      scaledData = ((data + 100) / 55) * (0.1 * width);
    }

    renderCtx.clearRect(0, 0, width, height);

    var grd = renderCtx.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(0.75, "yellow");
    grd.addColorStop(1, "red");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 0, scaledData, height);
  };

  componentDidMount = () => {
    let { renderRate } = this.props.blockInfo;
    this.rendererL = setInterval(this.renderAudioL.bind(this), renderRate);
  };

  render() {
    let { id, pan, volume, muted } = this.props.blockInfo;
    if (this.micPermission) {
      return (
        <React.Fragment>
          <div style={{ position: "relative", height: "5rem", width: "13rem" }}>
            <div
              style={{
                fontSize: "0.64rem",
                position: "absolute",
                top: "0px",
                left: "5.4375rem"
              }}
            >
              Pan
            </div>
            <span
              style={{
                fontSize: "0.64rem",
                position: "absolute",
                left: "5px",
                top: "15px"
              }}
            >
              L
            </span>
            <input
              className="slider"
              type="range"
              style={{
                width: "160px",
                position: "absolute",
                left: "15px",
                top: "12px"
              }}
              onChange={e => this.props.changeBlock(id, "pan", e.target.value)}
              min={-1}
              max={1}
              value={pan}
              step={0.01}
              id="mic-pan"
            />
            <span
              style={{
                fontSize: "0.64rem",
                position: "absolute",
                left: "177px",
                top: "15px"
              }}
            >
              R
            </span>

            {/* Progress Bar */}
            <div
              className="progress"
              style={{
                width: "10rem",
                position: "absolute",
                top: "2.3875rem",
                left: "0.9375rem",
                backgroundColor: "black",
                height: "0.7rem"
              }}
            >
              <canvas
                ref={this.canvasLRef}
                style={{
                  width: "164px"
                }}
              />
            </div>

            {/* Mute and Channel */}
            <div
              className="text-center"
              style={{ position: "absolute", top: "3.625rem" }}
            >
              <label
                htmlFor="muted"
                style={{
                  fontSize: "0.64rem",
                  position: "absolute",
                  left: "0.9375rem",
                  top: "2px"
                }}
              >
                Mute
              </label>
              <input
                type="checkbox"
                className="my-1"
                id="muted"
                style={{
                  position: "absolute",
                  left: "2.525rem",
                  top: "-0.125rem"
                }}
                onChange={evt => {
                  this.props.changeBlock(id, "muted", !muted);
                }}
              />
              <label
                htmlFor="channel"
                style={{
                  fontSize: "0.64rem",
                  position: "absolute",
                  left: "4.6875rem",
                  top: "2px"
                }}
              >
                Channel:
              </label>
              <input
                type="text"
                className=""
                style={{
                  height: "1.2rem",
                  width: "1.8rem",
                  position: "absolute",
                  left: "7.5rem",
                  fontSize: "0.64rem"
                }}
                id="channel"
                onChange={e =>
                  this.props.changeBlock(id, "channel", e.target.value)
                }
              />
            </div>

            {/* Volume Slider */}
            <input
              className="slider text-center"
              orient="vertical"
              type="range"
              style={{
                width: "1.2rem",
                height: "72px",
                position: "absolute",
                left: "185px",
                top: "2px"
              }}
              onChange={e =>
                this.props.changeBlock(id, "volume", e.target.value)
              }
              min={0}
              max={100}
              step={1}
              value={volume}
              id="volume"
            />
          </div>

          <div
            className="text-center"
            style={{ backgroundColor: "grey", height: "24px" }}
          >
            <button
              className="badge-pill badge-light badge-sm mx-2 my-1"
              style={{ fontSize: "0.64rem" }}
            >
              Audio Settings
            </button>
            <span className="">
              <label
                htmlFor="osc"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                OSC port:
              </label>
              <input
                type="text"
                className="m-1"
                style={{
                  height: "1.2rem",
                  width: "2.4rem",
                  fontSize: "0.64rem"
                }}
                id="osc"
                onChange={e =>
                  this.props.changeBlock(id, "osc", e.target.value)
                }
              />
            </span>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            style={{
              position: "relative",
              height: "5rem",
              width: "13rem",
              textAlign: "center",
              verticalAlign: "middle",
              display: "table-cell",
              fontSize: ".8rem",
              color: "red"
            }}
          >
            Cannot access microphone. Please "allow" the access to microphone to
            use Direct Input.
          </div>
        </React.Fragment>
      );
    }
  }
}

/*const DirectInput = ({ blockInfo,changeBlock }) => {
  // catch
  // store.dispatch('delete')

};*/

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, { changeBlock })(DirectInput);
