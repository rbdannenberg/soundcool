import React from "react";
import store from "../../index";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  fontSize: "10px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
};

const Transposer = ({ blockInfo }) => {
  let { id, sliderCents, buttonCents } = blockInfo;
  const c = parseInt(buttonCents) + parseInt(sliderCents);
  return (
    <React.Fragment>
      <div className="">
        <label
          htmlFor="cents"
          style={{ fontSize: "0.8rem" }}
          className="float-right mx-2"
        >
          {"Cents: " + c}
        </label>
        <div className="text-center">
          <input
            className="slider mx-2"
            type="range"
            style={{ width: "15rem" }}
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "sliderCents",
                value: e.target.value
              });
            }}
            min={-50}
            max={50}
            value={c === 0 ? 0 : sliderCents}
            id="cents"
          />
          <div className="mx-2">
            <span className="float-left" style={{ fontSize: "0.8rem" }}>
              -50
            </span>
            <span className="float-center" style={{ fontSize: "0.8rem" }}>
              0
            </span>
            <span className="float-right" style={{ fontSize: "0.8rem" }}>
              +50
            </span>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-light m-2"
            style={circleStyle}
            onClick={e => {
              let x = buttonCents - 100;
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "buttonCents",
                value: x
              });
            }}
          >
            &#9837;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={circleStyle}
            onClick={() => {
              let x = 0 - sliderCents;
              console.log(x);
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "buttonCents",
                value: x
                // relative: false
              });
            }}
          >
            &#9838;
          </button>
          <button
            className="btn btn-light btn-circle m-2"
            style={circleStyle}
            onClick={e => {
              let x = buttonCents + 100;
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "buttonCents",
                value: x
              });
            }}
          >
            &#9839;
          </button>
        </div>
      </div>
      <div className="text-center row">
        <div className="col-md-12">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="m-2"
            style={{ height: "1.5rem", width: "3rem" }}
            id="osc"
            onChange={e => {
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "osc",
                value: e.target.value,
                relative: false
              });
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Transposer;
