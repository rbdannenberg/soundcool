import React from "react";
import store from "../../index";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
};

const Transposer = ({ blockInfo }) => {
  let { id, sliderCents, buttonCents } = blockInfo;
  const c = parseInt(buttonCents) + parseInt(sliderCents);
  return (
    <React.Fragment>
      <div className="card-body">
        <label htmlFor="cents" className="float-right">
          {"Cents: " + c}
        </label>
        <div className="text-center">
          <input
            className="slider m-2"
            type="range"
            style={{ width: "20rem" }}
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
          <span className="float-left"> -50 </span>
          <span className="float-center"> 0 </span>
          <span className="float-right"> +50 </span>
        </div>
        <div className="text-center">
          <button
            className="btn btn-light mx-4 my-2"
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
            className="btn btn-light btn-circle mx-4 my-2"
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
            className="btn btn-light btn-circle mx-4 my-2"
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
      <div className="card-footer">
        <div className="col-md-8 row">
          <label htmlFor="osc">OSC port:</label>
          <input
            type="text"
            className="m-2"
            style={{ height: "1.5rem", width: "4rem" }}
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
