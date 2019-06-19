import React from "react";
import store from "../../index";

const Mixer = ({ blockInfo }) => {
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
    volumeMaster
  } = blockInfo;
  return (
    <React.Fragment>
      <div class="text-center">
        <div className="container my-2">
          <div className="row" style={{ marginLeft: "-5px" }}>
            <div className="col-md-9" style={{ width: "15rem" }}>
              <div className="row">
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>1</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "0", id]
                        });
                      }}
                    >
                      {inNode[0] === undefined ? "In" : inNode[0][0]}
                    </button>
                  </div>
                  <div className="row" style={{ padding: "2px" }}>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume1",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume1}
                      id="volume1"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>2</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "1", id]
                        });
                      }}
                    >
                      {inNode[1] === undefined ? "In" : inNode[1][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume2",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume2}
                      id="volume2"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>3</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "2", id]
                        });
                      }}
                    >
                      {inNode[2] === undefined ? "In" : inNode[2][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume3",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume3}
                      id="volume3"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>4</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "3", id]
                        });
                      }}
                    >
                      {inNode[3] === undefined ? "In" : inNode[3][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume4",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume4}
                      id="volume4"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>5</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "4", id]
                        });
                      }}
                    >
                      {inNode[4] === undefined ? "In" : inNode[4][0]}
                    </button>
                  </div>
                  <div className="row" style={{ padding: "2px" }}>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume5",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume5}
                      id="volume5"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>6</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "5", id]
                        });
                      }}
                    >
                      {inNode[5] === undefined ? "In" : inNode[5][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume6",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume6}
                      id="volume6"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>7</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "6", id]
                        });
                      }}
                    >
                      {inNode[6] === undefined ? "In" : inNode[6][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume7",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume7}
                      id="volume7"
                    />
                  </div>
                </div>
                <div className="col" style={{ width: "3.5rem" }}>
                  <div className="row">
                    <span>8</span>
                    <button
                      id="inButton1"
                      className="btn btn-warning btn-sm m-1"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: "0.8rem"
                      }}
                      onClick={() => {
                        store.dispatch({
                          type: "CONNECTING_BLOCK",
                          node: "nowIn",
                          value: [name, "7", id]
                        });
                      }}
                    >
                      {inNode[7] === undefined ? "In" : inNode[7][0]}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <div
                      className="progress progress-bar-vertical"
                      style={{ width: "0.2rem", marginLeft: "-10px" }}
                    >
                      <div
                        className="progress-bar "
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "60%" }}
                      />
                    </div>
                    <input
                      className="slider text-center"
                      orient="vertical"
                      type="range"
                      style={{
                        width: "1rem",
                        height: "7rem",
                        marginLeft: "-10px"
                      }}
                      onChange={e => {
                        store.dispatch({
                          type: "CHANGE_BLOCK",
                          id: id,
                          field: "volume8",
                          value: e.target.value
                        });
                      }}
                      min={0}
                      max={100}
                      step={1}
                      value={volume8}
                      id="volume8"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-2" style={{ width: "3rem" }}>
              <div className="row">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    height: "17rem",
                    width: "0.2rem",
                    marginLeft: "-10px"
                  }}
                >
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "60%" }}
                  />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    height: "17rem",
                    width: "0.2rem",
                    marginLeft: "-10px"
                  }}
                >
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "60%" }}
                  />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "0.5rem",
                    height: "17rem",
                    marginLeft: "-10px",
                    marginRight: "-10px"
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
                  id="volumeMaster"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className=""
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

export default Mixer;
