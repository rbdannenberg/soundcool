import React from "react";
import { store } from "../../../index";

const Channel = ({ num, name, id, inNode, volume, audioObj }) => {
    return (
        <React.Fragment
        // style={{ position: "absolute", width: "40px", height: "120px" }}
        >
            <span style={{ position: "absolute", left: "8px" }}>{num}</span>
            <button
                id={"inButton" + num}
                className="btn btn-light btn-sm"
                style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    fontSize: "0.8rem",
                    padding: "0px",
                    position: "absolute",
                    left: "20px"
                }}
                onClick={() => {
                    store.dispatch({
                        type: "CONNECTING_BLOCK",
                        node: "nowIn",
                        value: [name, num - 1, id, audioObj]
                    });
                }}
            >
                {inNode[num - 1] === undefined ? "In" : inNode[num - 1][0]}
            </button>
            <div className="">
                <div
                    className="progress progress-bar-vertical"
                    style={{
                        position: "absolute",
                        backgroundColor: "black",
                        width: "10px",
                        left: "7px",
                        top: "30px"
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
                    className="progress progress-bar-vertical"
                    style={{
                        position: "absolute",
                        backgroundColor: "black",
                        width: "10px",
                        left: "20px",
                        top: "30px"
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
                <input
                    className="slider text-center"
                    orient="vertical"
                    type="range"
                    style={{
                        width: "1rem",
                        height: "102px",
                        position: "absolute",
                        left: "32px",
                        top: "28px"
                    }}
                    onChange={e => {
                        store.dispatch({
                            type: "CHANGE_BLOCK",
                            id: id,
                            field: "volume" + num,
                            value: e.target.value
                        });
                    }}
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    id={"volume" + num}
                />
            </div>
        </React.Fragment>
    );
};

const Mixer = ({ blockInfo }) => {
    // #region props
    let {
        id,
        name,
        inNode,
        volume1,
        volume2,
        volume3,
        volume4,
        volume5,
        volume6,
        volume7,
        volume8,
        volumeMaster,
        audioObj
    } = blockInfo;
    // #endregion

    return (
        <React.Fragment>
            <div style={{ position: "relative", height: "280px" }}>
                <div style={{ position: "absolute", left: "10px" }}>
                    <Channel
                        num={1}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume1}
                    />
                </div>
                <div style={{ position: "absolute", left: "62px" }}>
                    <Channel
                        num={2}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume2}
                    />
                </div>
                <div style={{ position: "absolute", left: "114px" }}>
                    <Channel
                        num={3}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume3}
                    />
                </div>
                <div style={{ position: "absolute", left: "166px" }}>
                    <Channel
                        num={4}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume4}
                    />
                </div>
                <div
                    style={{ position: "absolute", top: "140px", left: "10px" }}
                >
                    <Channel
                        num={5}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume5}
                    />
                </div>
                <div
                    style={{ position: "absolute", top: "140px", left: "62px" }}
                >
                    <Channel
                        num={6}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume6}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "140px",
                        left: "114px"
                    }}
                >
                    <Channel
                        num={7}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume7}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "140px",
                        left: "166px"
                    }}
                >
                    <Channel
                        num={8}
                        name={name}
                        id={id}
                        inNode={inNode}
                        audioObj={audioObj}
                        volume={volume8}
                    />
                </div>

                <div
                    className=""
                    style={{ position: "absolute", left: "220px" }}
                >
                    <div className="">
                        <div
                            className="progress progress-bar-vertical"
                            style={{
                                position: "absolute",
                                backgroundColor: "black",
                                height: "200px",
                                width: "10px",
                                left: "7px",
                                top: "30px"
                            }}
                        >
                            <div
                                className="progress-bar "
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{
                                    height: "60%",
                                    backgroundColor: "green"
                                }}
                            />
                        </div>
                        <div
                            className="progress progress-bar-vertical"
                            style={{
                                position: "absolute",
                                backgroundColor: "black",
                                height: "200px",
                                width: "10px",
                                left: "20px",
                                top: "30px"
                            }}
                        >
                            <div
                                className="progress-bar "
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{
                                    height: "60%",
                                    backgroundColor: "green"
                                }}
                            />
                        </div>
                        <input
                            className="slider "
                            orient="vertical"
                            type="range"
                            style={{
                                width: "1rem",
                                height: "200px",
                                position: "absolute",
                                left: "32px",
                                top: "28px"
                            }}
                            onChange={e => {
                                store.dispatch({
                                    type: "CHANGE_BLOCK",
                                    id: id,
                                    field: "volumeMaster",
                                    value: e.target.value
                                });
                            }}
                            min={0}
                            max={100}
                            step={1}
                            value={volumeMaster}
                            id={"volumeMaster"}
                        />
                    </div>
                </div>
            </div>
            <div
                className="text-center"
                style={{ height: "30px", backgroundColor: "grey" }}
            >
                <div className="col-md-12">
                    <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
                        OSC port:
                    </label>
                    <input
                        type="text"
                        className="m-1"
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
                </div>
            </div>
        </React.Fragment>
    );
};

export default Mixer;
