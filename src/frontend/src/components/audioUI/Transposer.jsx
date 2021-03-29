import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

const circleStyle = {
  width: "1.2rem",
  height: "1.2rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "13px",
  lineHeight: 1.428571429,
  borderRadius: "0.8rem",
  borderColor: "black"
};

const Transposer = ({ blockInfo, changeBlock }) => {
  let { id, sliderCents, buttonCents, grainDur } = blockInfo;
  const c = parseInt(buttonCents) + parseInt(sliderCents);
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "230", height: "103px", position: "relative" }}
      >
        <label
          htmlFor="cents"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            right: "0.5rem",
            top: "4px"
          }}
          className="float-right mx-2"
        >
          {"Cents: " + c}
        </label>
        <div className="text-center">
          <input
            className="slider mx-2"
            type="range"
            style={{
              width: "11rem",
              position: "absolute",
              left: "8px",
              top: "16px"
            }}
            onChange={e => {
              changeBlock(id, "sliderCents", e.target.value);
              changeBlock(
                id,
                "pitchShift",
                parseInt(e.target.value) + parseInt(buttonCents)
              );
            }}
            min={-400}
            max={400}
            value={c === 0 ? 0 : sliderCents}
            id="cents"
          />
          <div
            className="mx-2"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "36px"
            }}
          >
            <span
              className="float-left"
              style={{ position: "absolute", left: "0.3125rem", top: "-6px" }}
            >
              -400
            </span>
            <span
              className="float-center"
              style={{ position: "absolute", left: "5.8125rem", top: "-6px" }}
            >
              0
            </span>
            <span
              className="float-right"
              style={{ position: "absolute", left: "10.3125rem", top: "-6px" }}
            >
              +400
            </span>
          </div>
        </div>

        <label
          htmlFor="grainDur"
          style={{
            fontSize: "0.64rem",
            position: "absolute",
            right: "0.5rem",
            top: "44px"
          }}
          className="float-right mx-2"
        >
          {"GrainSize (ms): " + grainDur}
        </label>
        <div className="text-center">
          <input
            className="slider mx-2"
            type="range"
            style={{
              width: "11rem",
              position: "absolute",
              left: "8px",
              top: "55px"
            }}
            onChange={e => {
              changeBlock(id, "grainDur", parseInt(e.target.value));
            }}
            min={10}
            max={1000}
            id="grainDur"
            value={grainDur}
          />
          <div
            className="mx-2"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "70px"
            }}
          >
            <span
              className="float-left"
              style={{ position: "absolute", left: "5px" }}
            >
              10
            </span>
            <span
              className="float-right"
              style={{ position: "absolute", left: "10.3125rem" }}
            >
              1000
            </span>
          </div>
        </div>

        <div
          className="text-center"
          style={{ position: "absolute", top: "72px" }}
        >
          <button
            className="btn btn-light m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "2.25rem"
            }}
            onClick={e => {
              let x = buttonCents - 100;
              changeBlock(id, "buttonCents", x);
              changeBlock(
                id,
                "pitchShift",
                parseInt(x) + parseInt(sliderCents)
              );
            }}
          >
            &#9837;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "5.375rem"
            }}
            onClick={() => {
              //let x = 0 - sliderCents;
              // console.log(x);
              changeBlock(id, "buttonCents", 0);
              changeBlock(id, "sliderCents", 0);
              changeBlock(id, "pitchShift", 0);
            }}
          >
            &#9838;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "8.5rem"
            }}
            onClick={e => {
              let x = buttonCents + 100;
              changeBlock(id, "buttonCents", x);
              changeBlock(
                id,
                "pitchShift",
                parseInt(x) + parseInt(sliderCents)
              );
            }}
          >
            &#9839;
          </button>
        </div>
      </div>

      <div
        className="text-center"
        style={{ height: "24px", backgroundColor: "grey" }}
      >
        <div className="col-md-12">
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
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, { changeBlock })(Transposer);
