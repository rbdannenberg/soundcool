import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { changeBlock } from "./actions";
import PiecewiseLogInput from "./PiecewiseLogInput";

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
    delay_jitter_w
  } = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "13rem", height: "12.5rem", position: "relative" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        {/* Rate */}
        <label
          htmlFor="rate"
          data-tip="Grain Rate: expected number of grains to be played per second. range: [0, 1000]"
          className="tooltip-on-hover"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "4px",
            left: "3px"
          }}
        >
          {"Grain Rate: "}
        </label>
        <PiecewiseLogInput
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "0.125rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "rate", e)}
          minrange={0}
          maxrange={1000}
          linearZone={0.1}
          lowValue={1}
          highValue={1000}
          value={rate}
          step={1}
          id="rate"
        />
        <label
          htmlFor="rate"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "4px",
            left: "10.8rem"
          }}
        >
          {rate}
        </label>

        {/* ioi_jitter */}
        <label
          htmlFor="ioi_jitter"
          data-tip="specifies jitter in grain scheduling. range: [0, 1]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "24px",
            left: "3px"
          }}
        >
          {"Timing Jitter: "}
        </label>
        <PiecewiseLogInput
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "1.4375rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "ioi_jitter", e)}
          minrange={0}
          maxrange={1}
          linearZone={0.001}
          lowValue={0.001}
          highValue={1}
          step={0.0001}
          value={ioi_jitter}
          id="ioi_jitter"
        />
        <label
          htmlFor="ioi_jitter"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "24px",
            left: "10.8rem"
          }}
        >
          {ioi_jitter}
        </label>

        {/* dur */}
        <label
          htmlFor="dur"
          data-tip="duration of each grain in seconds. range: [0.01, 1]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "44px",
            left: "3px"
          }}
        >
          {"Duration: "}
        </label>
        <PiecewiseLogInput
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "2.5625rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "dur", e)}
          minrange={0}
          maxrange={1}
          linearZone={0.001}
          lowValue={0.001}
          highValue={1}
          step={0.0001}
          value={dur}
          id="dur"
        />
        <label
          htmlFor="dur"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "44px",
            left: "10.8rem"
          }}
        >
          {dur}
        </label>

        {/* pitch_shift */}
        <label
          htmlFor="pitch_shift"
          data-tip="specifies by how much to transpose a grain in cents. range: [-2400, 2400]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "64px",
            left: "3px"
          }}
        >
          {"Transpose: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "3.75rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "pitch_shift", e.target.value)}
          min={-2400}
          max={2400}
          value={pitch_shift}
          id="pitch_shift"
        />
        <label
          htmlFor="pitch_shift"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "64px",
            left: "10.8rem"
          }}
        >
          {pitch_shift}
        </label>

        {/* pitch_jitter */}
        <label
          htmlFor="pitch_jitter"
          data-tip="specifies a range of random pitch shift offset in cents. range: [0, 4800]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "84px",
            left: "3px"
          }}
        >
          {"Transp. Jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "5.0625rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "pitch_jitter", e.target.value)}
          min={0}
          max={4800}
          value={pitch_jitter}
          id="pitch_jitter"
        />
        <label
          htmlFor="pitch_jitter"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "84px",
            left: "10.8rem"
          }}
        >
          {pitch_jitter}
        </label>

        {/* reverse */}
        <label
          htmlFor="reverse"
          data-tip="probability of reversing a grain during playback. range: [0, 1]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "104px",
            left: "3px"
          }}
        >
          {"Reverse: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "6.375rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "reverse", e.target.value)}
          min={0}
          max={1}
          step={0.01}
          value={reverse}
          id="reverse"
        />
        <label
          htmlFor="reverse"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "104px",
            left: "10.8rem"
          }}
        >
          {reverse}
        </label>

        {/* pan */}
        <label
          htmlFor="pan"
          data-tip="pan amount during grain playback. range: [-1, 1]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "124px",
            left: "3px"
          }}
        >
          {"Pan: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "7.625rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "pan", e.target.value)}
          min={-1}
          max={1}
          step={0.01}
          value={pan}
          id="pan"
        />
        <label
          htmlFor="pan"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "124px",
            left: "10.8rem"
          }}
        >
          {pan}
        </label>

        {/* pan_jitter */}
        <label
          htmlFor="pan_jitter"
          data-tip="specifies a range of random offset added to pan amount for each grain. range: [0, 2]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "144px",
            left: "3px"
          }}
        >
          {"Pan Jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "8.75rem",
            left: "3.6rem"
          }}
          onChange={e => changeBlock(id, "pan_jitter", e.target.value)}
          min={0}
          max={2}
          step={0.01}
          value={pan_jitter}
          id="pan_jitter"
        />
        <label
          htmlFor="pan_jitter"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "144px",
            left: "10.8rem"
          }}
        >
          {pan_jitter}
        </label>

        {/* delay */}
        <label
          htmlFor="delay"
          data-tip="specfies the amount of delay in seconds from input to output. range: [0, 20]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "164px",
            left: "3px"
          }}
        >
          {"Delay: "}
        </label>
        <PiecewiseLogInput
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "10.1875rem",
            left: "3.6rem"
          }}
          onChange={e => {
            changeBlock(id, "delay", e);
            changeBlock(id, "delayJitter",
              parseFloat(e) * delay_jitter_w);
          }}
          minrange={0}
          maxrange={20}
          lowValue={0.1}
          highValue={20}
          linearZone={0}
          step={0.1}
          value={delay}
          id="delay"
        />
        <label
          htmlFor="delay"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "164px",
            left: "10.8rem"
          }}
        >
          {delay}
        </label>

        {/* delay_jitter */}
        <label
          htmlFor="delay_jitter"
          data-tip="specifies the spread in seconds around delay grains. range: [0, 20]"
          style={{
            fontSize: "0.54rem",
            position: "absolute",
            top: "184px",
            left: "3px"
          }}
        >
          {"Delay Jitter: "}
        </label>
        <input
          className="slider"
          type="range"
          style={{
            width: "7.1875rem",
            position: "absolute",
            top: "11.375rem",
            left: "3.6rem"
          }}
          onChange={e => {
            changeBlock(id, "delayJitter",
              parseFloat(e.target.value) * delay);
            changeBlock(id, "delay_jitter_w", e.target.value);
            }
          }
          min={0}
          max={1}
          step={0.1}
          value={delay_jitter_w}
          id="delay_jitter"
        />
        <label
          htmlFor="delay_jitter"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            top: "184px",
            left: "10.8rem"
          }}
        >
          {delay_jitter_w}
        </label>
      </div>

      {/* Footer */}
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "24px" }}
      >
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.64rem",
            marginBottom: "0"}}>
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
          <label htmlFor="oscPort" style={{ fontSize: "0.64rem",
            marginBottom: "0"}}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{height: "1.2rem", width: "2.4rem", fontSize: "0.64rem"}}
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
)(GranSynth);
