import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { changeBlock } from "./actions";

const GranSynth = ({ blockInfo, changeBlock }) => {
  let {
    id,
    rate,
    ioi_jitter,
    dur,
    pitch_shift,
    pitch_jitter,
    reverse,
    pan,
    pan_jitter,
    delay,
    delay_jitter
  } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "220px", position: "relative" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        {/* Rate */}
        <label
          htmlFor="rate"
          data-tip="Grain Rate: expected number of grains to be played per second. range: [1, 1000]"
          className="tooltip-on-hover"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "4px",
            left: "6px"
          }}
        >
          {"grain rate: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "6px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "rate", e.target.value)}
          min={0}
          max={1000}
          value={rate}
          id="rate"
        />

        {/* ioi_jitter */}
        <label
          htmlFor="ioi_jitter"
          data-tip="specifies jitter in grain scheduling. range: [0, 1]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "24px",
            left: "6px"
          }}
        >
          {"ioi_jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "26px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "ioi_jitter", e.target.value)}
          min={0}
          max={1}
          step={0.01}
          value={ioi_jitter}
          id="ioi_jitter"
        />

        {/* dur */}
        <label
          htmlFor="dur"
          data-tip="duration of each grain in seconds. range: [0.01, 1]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "44px",
            left: "6px"
          }}
        >
          {"grain dur: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "46px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "dur", e.target.value)}
          min={0.01}
          max={1}
          step={0.01}
          value={dur}
          id="dur"
        />

        {/* pitch_shift */}
        <label
          htmlFor="pitch_shift"
          data-tip="specifies by how much to transpose a grain in cents. range: [-2400, 2400]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "64px",
            left: "6px"
          }}
        >
          {"pitch_shift: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "66px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "pitch_shift", e.target.value)}
          min={-2400}
          max={2400}
          value={pitch_shift}
          id="pitch_shift"
        />

        {/* pitch_jitter */}
        <label
          htmlFor="pitch_jitter"
          data-tip="specifies a range of random pitch shift offset in cents. range: [0, 4800]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "84px",
            left: "6px"
          }}
        >
          {"pitch_jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "86px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "pitch_jitter", e.target.value)}
          min={0}
          max={4800}
          value={pitch_jitter}
          id="pitch_jitter"
        />

        {/* reverse */}
        <label
          htmlFor="reverse"
          data-tip="probability of reversing a grain during playback. range: [0, 1]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "104px",
            left: "6px"
          }}
        >
          {"reverse: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "106px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "reverse", e.target.value)}
          min={0}
          max={1}
          step={0.01}
          value={reverse}
          id="reverse"
        />

        {/* pan */}
        <label
          htmlFor="pan"
          data-tip="pan amount during grain playback. range: [-1, 1]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "124px",
            left: "6px"
          }}
        >
          {"pan: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "126px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "pan", e.target.value)}
          min={-1}
          max={1}
          step={0.01}
          value={pan}
          id="pan"
        />

        {/* pan_jitter */}
        <label
          htmlFor="pan_jitter"
          data-tip="specifies a range of random offset added to pan amount for each grain. range: [0, 2]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "144px",
            left: "6px"
          }}
        >
          {"pan_jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "146px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "pan_jitter", e.target.value)}
          min={0}
          max={2}
          step={0.01}
          value={pan_jitter}
          id="pan_jitter"
        />

        {/* delay */}
        <label
          htmlFor="delay"
          data-tip="specfies the amount of delay in seconds from input to output. range: [0, 20]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "164px",
            left: "6px"
          }}
        >
          {"delay: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "166px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "delay", e.target.value)}
          min={0}
          max={20}
          step={0.1}
          value={delay}
          id="delay"
        />

        {/* delay_jitter */}
        <label
          htmlFor="delay_jitter"
          data-tip="specifies the spread in seconds around delay grains. range: [0, 20]"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            top: "184px",
            left: "6px"
          }}
        >
          {"delay_jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "220px",
            position: "absolute",
            top: "186px",
            left: "80px"
          }}
          onChange={e => changeBlock(id, "delay_jitter", e.target.value)}
          min={0}
          max={20}
          step={0.1}
          value={delay_jitter}
          id="delay_jitter"
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
};
export default connect(
  mapStateToProps,
  { changeBlock }
)(GranSynth);
