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
        style={{ width: "230px", height: "35px", position: "relative" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />

        {/* Delay Time */}
        <input
          className="slider"
          type="range"
          style={{
            width: "7.5rem",
            position: "absolute",
            top: "-0.375rem",
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
              fontSize: "0.64rem",
              position: "absolute",
              top: "-1.0625rem",
              left: "7.5rem"
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
              width: "2.1875rem",
              height: "12px",
              left: "8.125rem",
              top: "-2px",
              fontSize: "0.64rem",
              padding: "0.0rem"
            }}
          />
          <label
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "-1.0625rem",
              left: "11.25rem"
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
              width: "2.1875rem",
              height: "12px",
              left: "10.6rem",
              top: "-2px",
              fontSize: "0.64rem",
              padding: "0.0rem"
            }}
          />
        </div>

        {/* Feedback */}
        <input
          className="slider "
          type="range"
          style={{
            width: "7.5rem",
            position: "absolute",
            top: "13px",
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
              fontSize: "0.64rem",
              position: "absolute",
              top: "1rem",
              left: "8.125rem"
            }}
            data-tip="Feedback: range [0, 1]"
          >
            feedback:
          </label>
          <input
            class="form-control"
            placeholder="feedback"
            value={delayFeedback}
            style={{
              position: "absolute",
              width: "1.6875rem",
              height: "12px",
              left: "10.9375rem",
              top: "1rem",
              fontSize: "0.64rem",
              padding: "0.0rem"
            }}
            onChange={e => changeBlock(id, "delayFeedback", e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "24px" }}
      >
        {!blockInfo.oscPort ? (
          <div>
            <label
              htmlFor="osc"
              style={{ fontSize: "0.64rem", marginBottom: "0" }}
            >
              OSC
            </label>
            <input
              type="checkbox"
              className="m-1"
              id="osc"
              onClick={() => changeBlock(id, "osc", undefined)}
            />
            <span className="col text-center">
              <label
                htmlFor="oscPort"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                OSC port:
              </label>
              <input
                type="text"
                className=""
                style={{
                  height: "1.2rem",
                  width: "2.4rem",
                  fontSize: "0.64rem"
                }}
                id="oscPort"
                onChange={e => changeBlock(id, "oscPort", e.target.value)}
              />
            </span>
          </div>
        ) : (
          <div>
            <span className="col text-center">
              <label
                htmlFor="oscPort"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                {"osc port: " + blockInfo.oscPort}
              </label>
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, { changeBlock })(Delay);
