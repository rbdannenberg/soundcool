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
        this.queryTime = 1;
        window.bar = this.queryTime;
    }

    loadFile = () => {
        let { audioObj, file, id } = this.props.blockInfo;
        if (file) {
            console.log("hello");
            // audio = new Audio(serveAudio(file.sound_id));
            let url = serveAudio(file.sound_id);
            console.log(url);
            console.log("audioObj is: ");
            console.log(audioObj);
            window.foo = audioObj;
            let audioLoadPromise = audioObj.load(url);
            audioLoadPromise
                .then(function(seconds) {
                    console.log("duration is: " + seconds);
                    changeBlock(id, "disabled", undefined);
                    changeBlock(id, "duration", seconds);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };

    setStart = () => {
        let { audioObj, id, startTime } = this.props.blockInfo;
        changeBlock(id, "startTime", audioObj.context.currentTime);
        console.log(startTime);
    };

    // called when the speed changes
    changeStart = () => {
        let { audioObj, startTime, id } = this.props.blockInfo;
        let currentTime = audioObj.context.currentTime;
        // since the speed changes, we replace the original startTime
        // by a start time in this speed frame
        newStart = currentTime - (currentTime - startTime) / speed;
        changeBlock(id, "startTime", newStart);
    };

    startProgress = () => {
        let { audioObj, startTime, id, speed } = this.props.blockInfo;
        // when sound starts to play, increment seconds
        // depending on the audio time frame and the speed
        // also start the progress bar of playing
        this.queryTime = setInterval(() => {
            let currentTime = audioObj.context.currentTime;
            // seconds is the overall progress that the audio starts running
            let seconds = ((currentTime - startTime) * speed).toFixed(2);
            changeBlock(id, "seconds", seconds);
            // changeBlock(id, "progress", duration / (seconds === 0? 0 : seconds ))
        }, 1000);
    };

    stopProgress = () => {
        this.queryTime.clearInterval();
    };

    render() {
        let {
            id,
            speed,
            volume,
            file,
            disabled,
            audioObj,
            seconds,
            progress,
            duration,
            startTime
        } = this.props.blockInfo;
        let hour = Math.floor(seconds / 3600);
        let minute = Math.floor((seconds / 60) % 60);
        let second = Math.floor(seconds % 60);

        const onSoundSelect = audio_id => {
            changeBlock(id, "file", audio_id);
            this.loadFile();
        };

        return (
            <React.Fragment>
                <div
                    className=""
                    style={{ position: "relative", height: "140px" }}
                >
                    {/* speed */}
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
                        disabled={disabled}
                        className="slider mx-1 my-2 text-center"
                        type="range"
                        style={{
                            width: "230px",
                            position: "absolute",
                            left: "5px",
                            top: "12px"
                        }}
                        onChange={e => {
                            changeBlock(id, "speed", e.target.value);
                            this.changeStart();
                        }}
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
                        <span
                            className=""
                            style={{ position: "absolute", left: "5px" }}
                        >
                            x0
                        </span>
                        <span
                            className=""
                            style={{ position: "absolute", left: "92px" }}
                        >
                            x1
                        </span>
                        <span
                            className=""
                            style={{ position: "absolute", left: "180px" }}
                        >
                            x2
                        </span>
                    </div>

                    {/* progress bar of playing */}
                    <div
                        className="progress"
                        style={{
                            width: "230px",
                            position: "absolute",
                            left: "8px",
                            top: "60px",
                            backgroundColor: "black"
                        }}
                    >
                        {/* <div
                            className="progress-bar "
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "60%", backgroundColor: "green" }}
                        /> */}
                        <input
                            disabled={disabled}
                            className="slider text-center"
                            type="range"
                            style={{ width: "230px" }}
                            onChange={e => {
                                // changeBlock(id, "progress", e.target.value);
                                console.log(e.target.value);
                                audioObj.seek(0.01 * e.target.value);
                            }}
                            min={0}
                            max={100}
                            step={0.01}
                            value={duration / (seconds === 0 ? 0 : seconds)}
                            id="progress"
                        />
                    </div>

                    {/* time */}
                    <div
                        style={{
                            fontSize: "0.8rem",
                            textAlign: "right",
                            position: "absolute",
                            top: "80px",
                            right: "75px"
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
                            disabled={disabled}
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
                            disabled={disabled}
                            className="btn btn-light m-1"
                            style={{
                                ...circleStyle,
                                position: "absolute",
                                left: "78px"
                            }}
                            onClick={() => {
                                audioObj.play();
                                changeBlock(id, "playing", undefined);
                                this.setStart();
                                this.startProgress();
                            }}
                        >
                            <FaPlay
                                style={{
                                    fontSize: "12px",
                                    marginLeft: "2.5px"
                                }}
                            />
                        </button>
                        <button
                            disabled={disabled}
                            className="btn btn-light btn-circle m-1"
                            style={{
                                ...circleStyle,
                                position: "absolute",
                                left: "120px"
                            }}
                            onClick={() => {
                                audioObj.stop();
                                changeBlock(id, "playing", undefined);
                                this.stopProgress();
                            }}
                        >
                            <FaSquare style={{ fontSize: "12px" }} />
                        </button>
                        <button
                            disabled={disabled}
                            className="btn btn-light btn-circle m-1"
                            style={{
                                ...circleStyle,
                                position: "absolute",
                                left: "160px"
                            }}
                            onClick={() => {
                                changeBlock(id, "reverse", undefined);
                                // audioObj.reverse();
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
                            left: "260px",
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
                            left: "270px",
                            top: "5px"
                        }}
                    >
                        {"Vol. " + volume}{" "}
                    </div>
                    <input
                        disabled={disabled}
                        className="slider text-center"
                        orient="vertical"
                        type="range"
                        style={{
                            width: "1.5rem",
                            height: "110px",
                            position: "absolute",
                            left: "278px",
                            top: "26px"
                        }}
                        onChange={e =>
                            changeBlock(id, "volume", e.target.value)
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
                    style={{ backgroundColor: "grey" }}
                >
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
                            onChange={e =>
                                changeBlock(id, "osc", e.target.value)
                            }
                        />
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

export default Player;
