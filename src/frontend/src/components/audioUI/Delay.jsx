import React from "react";
import { connect } from "react-redux";
import { changeBlock } from "./actions";
import ReactTooltip from "react-tooltip";

const Delay = ({ blockInfo, changeBlock }) => {
  let { id, delayTime, maxDelayTime, delayFeedback } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "44px", position: "relative" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />

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
          max={maxDelayTime}
          value={delayTime}
          id="delayTime"
        />
        <div class="form-group">
          <label
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              top: "-15px",
              left: "194px"
            }}
            data-tip="the amount of delay in ms: range [1, maxDelay]"
          >
            delay(ms):
          </label>
          <input
            class="form-control"
            placeholder="delay"
            value={delayTime}
            onChange={e => changeBlock(id, "delayTime", e.target.value)}
            style={{
              position: "absolute",
              width: "55px",
              height: "16px",
              left: "194px",
              top: "5px",
              fontSize: "0.7rem",
              padding: "0.0rem"
            }}
          />
          <label
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              top: "-15px",
              left: "264px"
            }}
            data-tip="max delay in ms: range [1, 60000]"
          >
            max:
          </label>
          <input
            class="form-control"
            placeholder="10000"
            onChange={e => changeBlock(id, "maxDelayTime", e.target.value)}
            style={{
              position: "absolute",
              width: "50px",
              height: "16px",
              left: "260px",
              top: "5px",
              fontSize: "0.7rem",
              padding: "0.0rem"
            }}
          />
        </div>

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
        <div class="form-group">
          <label
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              top: "22px",
              left: "194px"
            }}
            data-tip="feedback in ms: range [0, 1]"
          >
            feedback:
          </label>
          <input
            class="form-control"
            placeholder="feedback"
            value={delayFeedback}
            style={{
              position: "absolute",
              width: "50px",
              height: "16px",
              left: "260px",
              top: "24px",
              fontSize: "0.7rem",
              padding: "0.0rem"
            }}
            onChange={e => changeBlock(id, "delayFeedback", e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "30px" }}
      >
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="osc"
            onClick={() => changeBlock(id, "osc", undefined)}
          />
        </span>
        <span className="col text-center">
          <label htmlFor="oscPort" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{ height: "1.5rem", width: "3rem" }}
            id="oscPort"
            onChange={e => changeBlock(id, "oscPort", e.target.value)}
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
};
export default connect(
  mapStateToProps,
  { changeBlock }
)(Delay);
