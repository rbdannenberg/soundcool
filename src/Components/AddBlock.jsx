import React from "react";
import store from "../index";

const addBlock = (typeName, specValues) => {
  store.dispatch({
    type: "ADD_BLOCK",
    typeName,
    values: {
      inNode: undefined,
      outNode: undefined,
      collapse: false,
      ...specValues
    }
  });
};

const toHex = (r, g, b) => {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
};

const AddBlock = () => {
  return (
    <React.Fragment>
      <div class="dropdown">
        <button
          className="btn btn-info m-2 dropdown-toggle"
          id="New Dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          New
        </button>
        <div class="dropdown-menu" aria-labelledby="New Dropdown">
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("Delay", {
                color: toHex(210, 189, 120),
                delayTime: 76,
                feedback: 0.119,
                kinect: false,
                osc: undefined
              })
            }
          >
            Delay
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("Transposer", {
                color: toHex(193, 133, 200),
                buttonCents: 0,
                sliderCents: 0,
                osc: undefined
              })
            }
          >
            Transposer
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("Pan", {
                color: toHex(136, 179, 95),
                direction: 0,
                kinect: false,
                osc: undefined
              })
            }
          >
            Pan
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("Player", {
                inDisabled: true,
                color: toHex(229, 119, 125),
                playing: false,
                loop: false,
                kinect: false,
                osc: undefined
              })
            }
          >
            Player
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("SignalGen", {
                color: toHex(89, 199, 198),
                frequency: 440,
                waveform: "Silence",
                mod: "No Mod",
                kinect: false,
                osc: undefined
              })
            }
          >
            SignalGen
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("Speaker", {
                color: toHex(240, 254, 199),
                muted: false
              })
            }
          >
            Speaker
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              addBlock("DirectInput", {
                color: toHex(200, 231, 253),
                direction: 0,
                muted: false,
                channel: 1,
                osc: undefined
              })
            }
          >
            DirectInput
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddBlock;
