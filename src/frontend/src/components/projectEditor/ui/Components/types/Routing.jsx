import React from "react";
import changeBlock from "../../../handlers";
import { store } from "../../../index";

const Routing = ({ blockInfo }) => {
    let { id, name, inNode, outNode, audioObj } = blockInfo;
    return (
        <React.Fragment>
            <div
                className=""
                style={{
                    position: "relative",
                    height: "170px",
                    color: "white"
                }}
            >
                <div className="" style={{ position: "absolute" }}>
                    <div style={{ position: "absolute", top: "5px" }}>
                        <span style={{ position: "absolute", left: "50px" }}>
                            1
                        </span>
                        <button
                            id="inButton1"
                            className="btn btn-light btn-sm"
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                fontSize: "0.8rem",
                                padding: "0px",
                                position: "absolute",
                                left: "70px"
                            }}
                            onClick={() => {
                                store.dispatch({
                                    type: "CONNECTING_BLOCK",
                                    node: "nowIn",
                                    value: [name, "0", id, audioObj]
                                });
                            }}
                        >
                            {inNode[0] === undefined ? "In" : inNode[0][0]}
                        </button>
                    </div>

                    <div style={{ fontSize: "0.8rem" }}>
                        <div
                            className=""
                            style={{ position: "absolute", top: "36px" }}
                        >
                            <label
                                htmlFor="off1"
                                style={{ position: "absolute", left: "20px" }}
                            >
                                Off
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="off1"
                                onClick={() =>
                                    changeBlock(id, "off1", undefined)
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{ position: "absolute", top: "56px" }}
                        >
                            <label
                                htmlFor="output11"
                                style={{
                                    position: "absolute",
                                    left: "20px",
                                    width: "70px"
                                }}
                            >
                                {"Output 1"}
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="output11"
                                onClick={() =>
                                    changeBlock(id, "output11", undefined)
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{ position: "absolute", top: "76px" }}
                        >
                            <label
                                htmlFor="output21"
                                style={{
                                    position: "absolute",
                                    left: "20px",
                                    width: "70px"
                                }}
                            >
                                {"Output 2"}
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="output21"
                                onClick={() =>
                                    changeBlock(id, "output21", undefined)
                                }
                            />
                        </div>
                    </div>

                    <div
                        className="progress"
                        style={{
                            position: "absolute",
                            left: "15px",
                            top: "100px",
                            width: "102px",
                            height: "10px",
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
                    </div>
                    <div
                        className="progress"
                        style={{
                            position: "absolute",
                            left: "15px",
                            top: "115px",
                            width: "102px",
                            height: "10px",
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
                    </div>

                    <div style={{ position: "absolute", top: "136px" }}>
                        <span style={{ position: "absolute", left: "50px" }}>
                            1
                        </span>
                        <button
                            id="outButton1"
                            className="btn btn-light btn-sm"
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                fontSize: "0.8rem",
                                padding: "0px",
                                position: "absolute",
                                left: "70px"
                            }}
                            onClick={() => {
                                store.dispatch({
                                    type: "CONNECTING_BLOCK",
                                    node: "nowOut",
                                    value: [name, "0", id, audioObj]
                                });
                            }}
                        >
                            {outNode[0] === undefined ? "Out" : outNode[0][0]}
                        </button>
                    </div>
                </div>

                <div
                    className=""
                    style={{ position: "absolute", left: "130px" }}
                >
                    <div style={{ position: "absolute", top: "5px" }}>
                        <span style={{ position: "absolute", left: "50px" }}>
                            2
                        </span>
                        <button
                            id="inButton2"
                            className="btn btn-light btn-sm"
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                fontSize: "0.8rem",
                                padding: "0px",
                                position: "absolute",
                                left: "70px"
                            }}
                            onClick={() => {
                                store.dispatch({
                                    type: "CONNECTING_BLOCK",
                                    node: "nowIn",
                                    value: [name, "1", id, audioObj]
                                });
                            }}
                        >
                            {inNode[1] === undefined ? "In" : inNode[1][0]}
                        </button>
                    </div>

                    <div style={{ fontSize: "0.8rem" }}>
                        <div
                            className=""
                            style={{ position: "absolute", top: "36px" }}
                        >
                            <label
                                htmlFor="off2"
                                style={{ position: "absolute", left: "20px" }}
                            >
                                Off
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="off2"
                                onClick={() =>
                                    changeBlock(id, "off2", undefined)
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{ position: "absolute", top: "56px" }}
                        >
                            <label
                                htmlFor="output12"
                                style={{
                                    position: "absolute",
                                    left: "20px",
                                    width: "70px"
                                }}
                            >
                                {"Output 1"}
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="output12"
                                onClick={() =>
                                    changeBlock(id, "output12", undefined)
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{ position: "absolute", top: "76px" }}
                        >
                            <label
                                htmlFor="output22"
                                style={{
                                    position: "absolute",
                                    left: "20px",
                                    width: "70px"
                                }}
                            >
                                {"Output 2"}
                            </label>
                            <input
                                type="checkbox"
                                className=""
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "3px"
                                }}
                                id="output22"
                                onClick={() =>
                                    changeBlock(id, "output22", undefined)
                                }
                            />
                        </div>
                    </div>

                    <div
                        className="progress"
                        style={{
                            position: "absolute",
                            left: "15px",
                            top: "100px",
                            width: "102px",
                            height: "10px",
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
                    </div>
                    <div
                        className="progress"
                        style={{
                            position: "absolute",
                            left: "15px",
                            top: "115px",
                            width: "102px",
                            height: "10px",
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
                    </div>

                    <div style={{ position: "absolute", top: "136px" }}>
                        <span style={{ position: "absolute", left: "50px" }}>
                            2
                        </span>
                        <button
                            id="outButton2"
                            className="btn btn-light btn-sm"
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                fontSize: "0.8rem",
                                padding: "0px",
                                position: "absolute",
                                left: "70px"
                            }}
                            onClick={() => {
                                store.dispatch({
                                    type: "CONNECTING_BLOCK",
                                    node: "nowOut",
                                    value: [name, "1", id, audioObj]
                                });
                            }}
                        >
                            {outNode[1] === undefined ? "Out" : outNode[1][0]}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Routing;
