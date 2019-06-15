import React from "react";
import store from "../index";

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
              store.dispatch({
                type: "ADD_BLOCK",
                typeName: "Delay",
                values: {
                  inNode: undefined,
                  outNode: undefined,
                  collapse: false,
                  color: "burlywood",
                  delayTime: 76,
                  feedback: 0.119,
                  kinect: false,
                  osc: undefined
                }
              })
            }
          >
            Delay
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              store.dispatch({
                type: "ADD_BLOCK",
                typeName: "Transposer",
                // id: nextBlockId++,
                values: {
                  inNode: undefined,
                  outNode: undefined,
                  collapse: false,
                  color: "orchid",
                  buttonCents: 0,
                  sliderCents: 0,
                  osc: undefined
                }
              })
            }
          >
            Transposer
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              store.dispatch({
                type: "ADD_BLOCK",
                typeName: "Pan",
                // id: nextBlockId++,
                values: {
                  inNode: undefined,
                  outNode: undefined,
                  collapse: false,
                  color: "olivedrab",
                  direction: 0,
                  kinect: false,
                  osc: undefined
                }
              })
            }
          >
            Pan
          </div>
          <div
            class="dropdown-item"
            onClick={() =>
              store.dispatch({
                type: "ADD_BLOCK",
                typeName: "Player",
                // id: nextBlockId++,
                values: {
                  inDisAbled: true,
                  inNode: undefined,
                  outNode: undefined,
                  collapse: false,
                  color: "lightcoral",
                  playing: false,
                  loop: false,
                  kinect: false,
                  osc: undefined
                }
              })
            }
          >
            Player
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddBlock;
