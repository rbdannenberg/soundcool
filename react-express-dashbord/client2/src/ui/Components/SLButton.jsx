import React from "react";
import store from "../../index";

const SLButton = () => {
  return (
    <React.Fragment>
      <button
        className="btn btn-info m-2"
        onClick={() => {
          store.dispatch({
            type: "SAVE_STATE",
            id: undefined
          });
        }}
      >
        Save
      </button>
      {/* <button
        className="btn btn-info m-2"
        onClick={() => {
          store.dispatch({
            type: "LOAD_STATE",
            id: undefined
          });
        }}
      >
        Load
      </button> */}
    </React.Fragment>
  );
};

export default SLButton;
