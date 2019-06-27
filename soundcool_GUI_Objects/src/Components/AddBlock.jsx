import React from "react";
import store from "../index";
import specValues from "./blockSpecs";

const addBlock = typeName => {
  store.dispatch({
    type: "ADD_BLOCK",
    typeName,
    values: {
      // inNode and outNode are a list, since a block can have multiple input and output
      inNode: [],
      outNode: [],
      collapse: false,
      ...specValues[typeName]
    }
  });
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
          <div class="dropdown-item" onClick={() => addBlock("Delay")}>
            Delay
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Transposer")}>
            Transposer
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Pan")}>
            Pan
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Player")}>
            Player
          </div>
          <div class="dropdown-item" onClick={() => addBlock("SignalGen")}>
            SignalGen
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Speaker")}>
            Speaker
          </div>
          <div class="dropdown-item" onClick={() => addBlock("DirectInput")}>
            DirectInput
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Pitch")}>
            Pitch
          </div>
          {/* <div class="dropdown-item" onClick={() => addBlock("VSTHost")}>
            VSTHost
          </div> */}
          <div class="dropdown-item" onClick={() => addBlock("Routing")}>
            Routing
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Mixer")}>
            Mixer
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Record")}>
            Record
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Spectralscope")}>
            Spectralscope
          </div>
          <div class="dropdown-item" onClick={() => addBlock("Oscilloscope")}>
            Oscilloscope
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddBlock;
