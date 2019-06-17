import React from "react";
import store from "../../index";

const Routing = ({ blockInfo }) => {
  let { id, name, inNode, outNode } = blockInfo;
  return (
    <React.Fragment>
      <div class="text-center">
        <div className="container my-2">
          <div className="row text-center">
            <div className="col mx-2">
              <div className="row">
                <span>1</span>
                <button
                  id="inButton1"
                  className="btn btn-warning btn-sm m-1"
                  style={{ width: "2rem", height: "2rem", fontSize: "0.8rem" }}
                  onClick={() => {
                    store.dispatch({
                      type: "CONNECTING_BLOCK",
                      node: "nowIn",
                      value: name + "0"
                    });
                  }}
                >
                  {inNode[0] === undefined ? "In" : inNode[0]}
                </button>
              </div>
              <div className="">
                <div className="text-center row">
                  <label htmlFor="off1" style={{ fontSize: "0.8rem" }}>
                    Off1
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="off1"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "off1",
                        value: undefined
                      });
                    }}
                  />
                </div>
                <div className="text-center row">
                  <label htmlFor="output11" style={{ fontSize: "0.8rem" }}>
                    Output1
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="output11"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "output11",
                        value: undefined
                      });
                    }}
                  />
                </div>
                <div className="text-center row">
                  <label htmlFor="output21" style={{ fontSize: "0.8rem" }}>
                    Output2
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="output21"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "output21",
                        value: undefined
                      });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="progress my-1" style={{ width: "7rem" }}>
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="progress" style={{ width: "7rem" }}>
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="row my-2">
                <span>1</span>
                <button
                  id="outButton1"
                  className="btn btn-warning btn-sm m-1"
                  style={{
                    width: "2.5rem",
                    height: "2rem",
                    fontSize: "0.8rem"
                  }}
                  onClick={() => {
                    store.dispatch({
                      type: "CONNECTING_BLOCK",
                      node: "nowOut",
                      value: name + "0"
                    });
                  }}
                >
                  {outNode[0] === undefined ? "Out" : outNode[0]}
                </button>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <span>2</span>
                <button
                  id="inButton2"
                  className="btn btn-warning btn-sm m-1"
                  style={{ width: "2rem", height: "2rem", fontSize: "0.8rem" }}
                  onClick={() => {
                    store.dispatch({
                      type: "CONNECTING_BLOCK",
                      node: "nowIn",
                      value: name + "1"
                    });
                  }}
                >
                  {inNode[1] === undefined ? "In" : inNode[1]}
                </button>
              </div>
              <div className="">
                <div className="text-center row">
                  <label htmlFor="off2" style={{ fontSize: "0.8rem" }}>
                    Off2
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="off2"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "off2",
                        value: undefined
                      });
                    }}
                  />
                </div>
                <div className="text-center row">
                  <label htmlFor="output12" style={{ fontSize: "0.8rem" }}>
                    Output1
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="output12"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "output12",
                        value: undefined
                      });
                    }}
                  />
                </div>
                <div className="text-center row">
                  <label htmlFor="output22" style={{ fontSize: "0.8rem" }}>
                    Output2
                  </label>
                  <input
                    type="checkbox"
                    className="m-1"
                    id="output22"
                    onClick={() => {
                      store.dispatch({
                        type: "CHANGE_BLOCK",
                        id: id,
                        field: "output22",
                        value: undefined
                      });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="progress my-1" style={{ width: "7rem" }}>
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="progress" style={{ width: "7rem" }}>
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="row my-2">
                <span>2</span>
                <button
                  id="outButton2"
                  className="btn btn-warning btn-sm m-1"
                  style={{
                    width: "2.5rem",
                    height: "2rem",
                    fontSize: "0.8rem"
                  }}
                  onClick={() => {
                    store.dispatch({
                      type: "CONNECTING_BLOCK",
                      node: "nowOut",
                      value: name + "1"
                    });
                  }}
                >
                  {outNode[1] === undefined ? "Out" : outNode[1]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Routing;
