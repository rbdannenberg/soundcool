import React from "react";
import { connect } from "react-redux";
import { changeBlock } from "./actions";

const Delay = ({ blockInfo, changeBlock }) => {
  let { id, delayTime, delayFeedback } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "44px", position: "relative" }}
      >
        {/* Delay Time */}
        <input
          className="slider"
          type="range"
          style={{
            width: "178px",
            position: "absolute",
            top: "6px",
            left: "6px"
          }}
          onChange={e => changeBlock(id, "delayTime", e.target.value)}
          min={0}
          max={1000}
          value={delayTime}
          id="delayTime"
        />
        <label
          htmlFor="delayTime"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "4px",
            left: "194px"
          }}
        >
          {"delay(ms): "}
        </label>
        <input
          type="number"
          value={delayTime}
          style={{
            position: "absolute",
            width: "40px",
            height: "16px",
            left: "260px",
            top: "5px",
            fontSize: "0.7rem"
          }}
          onChange={e => changeBlock(id, "delayTime", e.target.value)}
        />

        {/* Feedback */}
        <input
          className="slider "
          type="range"
          style={{
            width: "178px",
            position: "absolute",
            top: "24px",
            left: "6px"
          }}
          onChange={e => changeBlock(id, "delayFeedback", e.target.value)}
          step={0.001}
          min={0}
          max={1}
          value={delayFeedback}
          id="feedback"
        />
        <span
          htmlFor="feedback"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "22px",
            left: "194px"
          }}
        >
          {"feedback: "}
        </span>
        <input
          type="number"
          value={delayFeedback}
          style={{
            position: "absolute",
            width: "40px",
            height: "16px",
            left: "260px",
            top: "24px",
            fontSize: "0.7rem"
          }}
          onChange={e => changeBlock(id, "delayFeedback", e.target.value)}
        />
      </div>

      {/* Footer */}
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
            onClick={() => changeBlock(id, "kinect", undefined)}
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
            onChange={e => changeBlock(id, "osc", e.target.value)}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
}
export default connect(
  mapStateToProps,
  { changeBlock }
)(Delay);
