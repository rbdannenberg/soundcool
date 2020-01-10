import React from "react";
import specValues from "./blockSpecs";
import { connect } from "react-redux";

const AddBlock = props => {
  const addBlock = typeName => {
    props.dispatch({
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

  return (
    <React.Fragment>
      <div style={{ display: "inline-block" }} className="dropdown">
        <button
          className="btn btn-info m-2 dropdown-toggle"
          id="New Dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          New
        </button>
        <div className="dropdown-menu" aria-labelledby="New Dropdown">
          <div className="dropdown-item" onClick={() => addBlock("Delay")}>
            Delay
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Transposer")}>
            Transposer
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Pan")}>
            Pan
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Player")}>
            Player
          </div>
          <div className="dropdown-item" onClick={() => addBlock("SignalGen")}>
            SignalGen
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Speaker")}>
            Speaker
          </div>
          <div
            className="dropdown-item"
            onClick={() => addBlock("DirectInput")}
          >
            DirectInput
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Pitch")}>
            Pitch
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Reverb")}>
            Reverb
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Routing")}>
            Routing
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Mixer")}>
            Mixer
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Record")}>
            Record
          </div>
          <div
            className="dropdown-item"
            onClick={() => addBlock("Spectroscope")}
          >
            Spectroscope
          </div>
          <div
            className="dropdown-item"
            onClick={() => addBlock("Oscilloscope")}
          >
            Oscilloscope
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Envelope")}>
            Envelope
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Filter")}>
            Filter
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Keyboard")}>
            Keyboard
          </div>
          <div
            className="dropdown-item"
            onClick={() => addBlock("SamplePlayer")}
          >
            SamplePlayer
          </div>
          <div className="dropdown-item" onClick={() => addBlock("Sequencer")}>
            Sequencer
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect()(AddBlock);
