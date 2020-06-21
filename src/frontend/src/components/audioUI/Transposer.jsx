import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "16px",
  lineHeight: 1.428571429,
  borderRadius: "1rem",
  borderColor: "black"
};

const Transposer = ({ blockInfo, changeBlock }) => {
  let { id, sliderCents, buttonCents } = blockInfo;
  const c = parseInt(buttonCents) + parseInt(sliderCents);
  return (
    <React.Fragment>
      <div
        className=""
        style={{ width: "288px", height: "88px", position: "relative" }}
      >
        <label
          htmlFor="cents"
          style={{
            fontSize: "0.8rem",
            position: "absolute",
            right: "24px",
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
              width: "15rem",
              position: "absolute",
              left: "10px",
              top: "20px"
            }}
            onChange={e => {
              changeBlock(id,
                "sliderCents",
                e.target.value);
              changeBlock(id, "pitchShift",
                parseInt(e.target.value) + parseInt(buttonCents));
              }}
            min={-50}
            max={50}
            value={c === 0 ? 0 : sliderCents}
            id="cents"
          />
          <div
            className="mx-2"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              top: "36px"
            }}
          >
            <span
              className="float-left"
              style={{ position: "absolute", left: "5px" }}
            >
              -50
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
              +50
            </span>
          </div>
        </div>
        <div
          className="text-center"
          style={{ position: "absolute", top: "50px" }}
        >
          <button
            className="btn btn-light m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "56px"
            }}
            onClick={e => {
              let x = buttonCents - 100;
              changeBlock(id,"buttonCents",x)
              changeBlock(id, "pitchShift", parseInt(x) + parseInt(sliderCents));
            }}
          >
            &#9837;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "116px"
            }}
            onClick={() => {
              //let x = 0 - sliderCents;
              // console.log(x);
              changeBlock(id,"buttonCents", 0);
              changeBlock(id,"sliderCents", 0);
              changeBlock(id,"pitchShift", 0);
            }}
          >
            &#9838;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "176px"
            }}
            onClick={e => {
              let x = buttonCents + 100;
              changeBlock(id,"buttonCents", x);
              changeBlock(id, "pitchShift", parseInt(x) + parseInt(sliderCents));
            }}
          >
            &#9839;
          </button>
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
            onChange={e => changeBlock(id,"osc",e.target.value)}
          />
        </div>
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
)(Transposer);
