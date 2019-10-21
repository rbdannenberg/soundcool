import React from "react";
import { store } from "../../../index";
import changeBlock from "../../../handlers";

class Envelope extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.id = this.props.blockInfo.id;
        this.buffer = [];
        this.canvasHeight = 168;
        this.canvasWidth = 280;
    }

    calculateBuffer() {
        const envelope = this.props.blockInfo.envelope;
        const duration = this.props.blockInfo.duration;
        const xyEnv = envelope.map(pairs => [
            Math.floor((pairs[0] / this.canvasHeight) * duration * 441),
            (this.canvasWidth - pairs[1]) / this.canvasWidth
        ]);
        const bufferEnv = Array(441 * duration).fill(0);
        xyEnv.forEach(pairs => {
            bufferEnv[pairs[0]] = pairs[1];
            // fill in the connecting line
        });
        console.log("xyEnv");
        console.log(xyEnv);
        console.log("bufferEnv");
        console.log(bufferEnv);
    }

    checkCanvasLocation(e) {
        const c = this.canvasRef.current;
        let canvasCtx = c.getContext("2d");
        canvasCtx.clearRect(0, 0, 300, 200);
        let { left, top } = c.getBoundingClientRect();
        // add one point to the points list
        let x = e.clientX - left;
        let y = e.clientY - top;
        store.dispatch({
            type: "CHANGE_BLOCK",
            id: this.props.blockInfo.id,
            field: "envelope",
            num: this.props.blockInfo.pointCount,
            value: [x, y]
        });
        // pointCount ++
        changeBlock(this.id, "pointCount", this.props.blockInfo.pointCount + 1);
        this.renderLines();
    }

    renderLines() {
        const c = this.canvasRef.current;
        let { left } = c.getBoundingClientRect();
        let canvasCtx = c.getContext("2d");
        canvasCtx.clearRect(0, 0, 300, 200);
        console.log("this is envelope");
        console.log(this.props.blockInfo.envelope);
        let sortedPoints = this.props.blockInfo.envelope.sort(
            ([a, b], [c, d]) => a - c
        );
        for (let i = 0; i < sortedPoints.length - 1; i++) {
            canvasCtx.beginPath();
            canvasCtx.fillRect(
                sortedPoints[i][0] + left,
                sortedPoints[i][1],
                3,
                3
            );
            canvasCtx.moveTo(sortedPoints[i][0] + left, sortedPoints[i][1]);
            canvasCtx.lineTo(
                sortedPoints[i + 1][0] + left,
                sortedPoints[i + 1][1]
            );
            canvasCtx.stroke();
            canvasCtx.fillRect(
                sortedPoints[i + 1][0] + left,
                sortedPoints[i + 1][1],
                3,
                3
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className=""
                    style={{
                        width: "288px",
                        height: "218px",
                        position: "relative"
                    }}
                >
                    <div style={{ position: "absolute" }}>
                        <span className="col text-center">
                            <label
                                htmlFor="loop"
                                style={{ fontSize: "0.8rem" }}
                            >
                                Loop
                            </label>
                            <input
                                type="checkbox"
                                className="m-1"
                                id="loop"
                                onClick={() => {
                                    changeBlock(this.id, "loop", undefined);
                                }}
                            />
                        </span>
                        <span className="col text-center">
                            <label
                                htmlFor="duration"
                                style={{ fontSize: "0.8rem" }}
                            >
                                Dur:
                            </label>
                            <input
                                type="text"
                                className="my-1 mx-1"
                                style={{ height: "1.5rem", width: "3rem" }}
                                id="duration"
                                onChange={e => {
                                    changeBlock(
                                        this.id,
                                        "duration",
                                        e.target.value
                                    );
                                }}
                            />
                        </span>
                        <button
                            className="col text-center badge-pill badge-light"
                            style={{
                                backgroundColor: "grey",
                                position: "absolute",
                                width: "50px",
                                height: "25px",
                                top: "5px",
                                left: "180px",
                                fontSize: "0.8rem",
                                padding: "0px"
                            }}
                            onClick={() => {
                                // clear the envelope
                                changeBlock(this.id, "envelope", []);
                                // clear the pointcount
                                changeBlock(this.id, "pointCount", 0);
                                this.renderLines();
                            }}
                        >
                            Clear
                        </button>
                        <button
                            className="col text-center badge-pill badge-light"
                            style={{
                                backgroundColor: "grey",
                                position: "absolute",
                                width: "50px",
                                height: "25px",
                                top: "5px",
                                left: "240px",
                                fontSize: "0.8rem",
                                padding: "0px"
                            }}
                            onClick={() => {
                                this.calculateBuffer();
                            }}
                        >
                            Apply
                        </button>
                    </div>
                    <canvas
                        ref={this.canvasRef}
                        style={{
                            position: "absolute",
                            width: "280px",
                            height: "168px",
                            top: "40px",
                            left: "10px",
                            backgroundColor: "#DCDEE0"
                        }}
                        onClick={e => {
                            e.persist();
                            console.log(e);
                            this.checkCanvasLocation(e);
                        }}
                    ></canvas>
                </div>
            </React.Fragment>
        );
    }
}

export default Envelope;
