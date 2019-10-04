import React from "react";
import changeBlock from "../../../handlers";
import { store } from "../../../index";

const Pitch = ({ blockInfo }) => {
    let { id, pitch, grainSize } = blockInfo;
    return (
        <React.Fragment>
            <div
                className=""
                style={{
                    width: "288px",
                    height: "102px",
                    position: "relative"
                }}
            >
                <label
                    htmlFor="cents"
                    style={{
                        fontSize: "0.8rem",
                        position: "absolute",
                        right: "64px",
                        top: "4px"
                    }}
                    className="float-right mx-2"
                >
                    {"Cents: "}
                </label>
                <input
                    type="number"
                    value={pitch}
                    style={{
                        position: "absolute",
                        width: "50px",
                        height: "16px",
                        right: "10px",
                        top: "5px",
                        fontSize: "0.7rem"
                    }}
                    onChange={e => changeBlock(id, "pitch", e.target.value)}
                />

                <div className="text-center">
                    <input
                        className="slider mx-2"
                        type="range"
                        style={{
                            width: "15rem",
                            position: "absolute",
                            left: "10px",
                            top: "20px"
                        }}
                        onChange={
                            e => changeBlock(id, "pitch", e.target.value)
                            // {
                            // store.dispatch({
                            //   type: "CHANGE_BLOCK",
                            //   id: id,
                            //   field: "pitch",
                            //   value: e.target.value
                            // });
                        }
                        min={-1200}
                        max={1200}
                        value={pitch}
                        id="cents"
                    />
                    <div
                        className="mx-2"
                        style={{
                            fontSize: "0.8rem",
                            position: "absolute",
                            top: "36px"
                        }}
                    >
                        <span
                            className="float-left"
                            style={{ position: "absolute", left: "5px" }}
                        >
                            -1200
                        </span>
                        <span
                            className="float-center"
                            style={{ position: "absolute", left: "126px" }}
                        >
                            0
                        </span>
                        <span
                            className="float-right"
                            style={{ position: "absolute", left: "235px" }}
                        >
                            +1200
                        </span>
                    </div>
                </div>

                <label
                    htmlFor="grainSize"
                    style={{
                        fontSize: "0.8rem",
                        position: "absolute",
                        right: "64px",
                        top: "60px"
                    }}
                    className="float-right mx-2"
                >
                    {"GrainSize: "}
                </label>
                <input
                    type="number"
                    value={grainSize}
                    style={{
                        position: "absolute",
                        width: "50px",
                        height: "16px",
                        right: "10px",
                        top: "60px",
                        fontSize: "0.7rem"
                    }}
                    onChange={e => changeBlock(id, "grainSize", e.target.value)}
                />
            </div>

            <div
                className="text-center"
                style={{ backgroundColor: "grey", height: "30px" }}
            >
                <span className="col text-center">
                    <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
                        Kinect
                    </label>
                    <input
                        type="checkbox"
                        className="m-1"
                        id="kinect"
                        onClick={() => {
                            store.dispatch({
                                type: "CHANGE_BLOCK",
                                id: id,
                                field: "kinect",
                                value: undefined
                            });
                        }}
                    />
                </span>
                <span className="col text-center">
                    <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
                        OSC port:
                    </label>
                    <input
                        type="text"
                        className="my-1"
                        style={{ height: "1.5rem", width: "3rem" }}
                        id="osc"
                        onChange={e => {
                            store.dispatch({
                                type: "CHANGE_BLOCK",
                                id: id,
                                field: "osc",
                                value: e.target.value
                            });
                        }}
                    />
                </span>
            </div>
        </React.Fragment>
    );
};

export default Pitch;
