import React from "react";
import changeBlock from "../../../handlers";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const circleStyle = {
    width: "2rem",
    height: "2rem",
    textAlign: "center",
    fontSize: "15px",
    lineHeight: 1.428571429,
    borderRadius: "0.5rem"
};

class Speaker extends React.Component {
    constructor(props) {
        super(props);
        this.canvasLRef = React.createRef();
        this.canvasRRef = React.createRef();
        this.rendererL = undefined;
        this.rendererR = undefined;
    }

    randomMeter = () => {
        let x = Math.random();
        return x;
    };

    // render function
    renderAudioL = () => {
        let { audioObj } = this.props.blockInfo;
        let canvasL = this.canvasLRef.current;
        if (canvasL === null) {
            clearInterval(this.rendererL);
            return;
        }
        let canvasLCtx = canvasL.getContext("2d");
        let renderCtx = canvasLCtx;
        let data = audioObj.getAudioData()[0];

        renderCtx.clearRect(0, 0, 230, 140);
        renderCtx.fillStyle = "green";
        renderCtx.fillRect(0, 0, (data - 40) * 40, 140);
    };

    // render function
    renderAudioR = () => {
        let { audioObj } = this.props.blockInfo;
        let canvasR = this.canvasRRef.current;
        if (canvasR === null) {
            clearInterval(this.rendererR);
            return;
        }
        let canvasRCtx = canvasR.getContext("2d");
        let renderCtx = canvasRCtx;
        let data = audioObj.getAudioData()[1];

        renderCtx.clearRect(0, 0, 230, 140);
        renderCtx.fillStyle = "green";
        renderCtx.fillRect(0, 0, (data - 40) * 40, 140);
    };

    // bindtocanvas
    componentDidMount = () => {
        let { renderRate } = this.props.blockInfo;
        this.rendererL = setInterval(this.renderAudioL.bind(this), renderRate);
        this.rendererR = setInterval(this.renderAudioR.bind(this), renderRate);
    };

    render() {
        let { id, muted } = this.props.blockInfo;
        let playButton;
        if (muted) {
            playButton = <FaVolumeMute />;
        } else {
            playButton = <FaVolumeUp />;
        }
        return (
            <React.Fragment>
                <div
                    className="text-center"
                    style={{ position: "relative", height: "48px" }}
                >
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
                        <canvas ref={this.canvasLRef} />
                        {/* <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={meterL}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: meterL + "%", backgroundColor: "green" }}
            /> */}
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
                        <canvas ref={this.canvasRRef} />
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
                        onClick={() => changeBlock(id, "muted", undefined)}
                    >
                        {playButton}
                    </button>
                </div>

                <div
                    className="text-center"
                    style={{ backgroundColor: "grey" }}
                >
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
    }
}

export default Speaker;
