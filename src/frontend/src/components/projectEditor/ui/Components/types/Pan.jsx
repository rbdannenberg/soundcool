import React from "react";
import { store } from "../../../index";

const Pan = ({ blockInfo }) => {
    let { id, panVal } = blockInfo;
    return (
        <React.Fragment>
            <div
                className="text-center"
                style={{ width: "288px", height: "40px", position: "relative" }}
            >
                <span
                    style={{
                        fontSize: "0.8rem",
                        position: "absolute",
                        left: "20px",
                        top: "10px"
                    }}
                >
                    L
                </span>
                <input
                    className="slider mx-2"
                    type="range"
                    style={{
                        width: "208px",
                        position: "absolute",
                        left: "24px",
                        top: "12px"
                    }}
                    onChange={e => {
                        store.dispatch({
                            type: "CHANGE_BLOCK",
                            id: id,
                            field: "panVal",
                            value: e.target.value
                        });
                    }}
                    min={-50}
                    max={50}
                    value={panVal}
                    id="panVal"
                />
                <span
                    style={{
                        fontSize: "0.8rem",
                        position: "absolute",
                        left: "244px",
                        top: "10px"
                    }}
                >
                    R
                </span>
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

export default Pan;
