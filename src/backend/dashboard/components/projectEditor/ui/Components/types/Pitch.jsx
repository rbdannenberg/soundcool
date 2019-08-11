import React from "react";
import changeBlock from "../../../handlers";
import {store} from "../../../index";

const Pitch = ({ blockInfo }) => {
  let { id, cents } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "62px", position: "relative" }}
      >
        <label
          htmlFor="cents"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            right: "34px",
            top: "4px"
          }}
          className="float-right mx-2"
        >
          {"Cents: "}
        </label>

        <input
          type="number"
          value={cents}
          style={{
            position: "absolute",
            width: "30px",
            height: "16px",
            right: "10px",
            top: "5px",
            fontSize: "0.7rem"
          }}
          onChange={e => changeBlock(id, "cents", e.target.value)}
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
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "cents",
                value: e.target.value
              });
            }}
            min={-400}
            max={400}
            value={cents}
            id="cents"
          />
          <div
            className="mx-2"
            style={{ fontSize: "0.8rem", position: "absolute", top: "36px" }}
          >
            <span
              className="float-left"
              style={{ position: "absolute", left: "5px" }}
            >
              -400
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
              +400
            </span>
          </div>
        </div>
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
