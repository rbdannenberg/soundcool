import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import "./custom.css";

const VSTHost = ({ blockInfo, changeBlock }) => {
  let { id, module, version } = blockInfo;
  return (
    <React.Fragment>
      <div className="text-center">
        <div className="row my-2">
          <input
            className="mx-4"
            style={{ fontSize: "0.8rem" }}
            type="file"
            onChange={e => changeBlock(id,"file",e.target.files[0])}
          />
        </div>
        <div
          className="btn btn-sm btn-light m-2"
          style={{ fontSize: "0.7rem", width: "8rem" }}
          onClick={() => changeBlock(id,"module",undefined)}
        >
          {module ? "Module Input" : "MIDI Input"}
        </div>

        <div className="text-center">
          <div className="dropdown col">
            <button
              className="btn btn-info dropdown-toggle"
              style={{ fontSize: "0.7rem", width: "8rem" }}
              id="version dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {version}
            </button>
            <div className="dropdown-menu" aria-labelledby="version dropdown">
              <div
                className="dropdown-item"
                onClick={() => changeBlock(id,"version","to Soundcool 3.1.1")}
              >
                to Soundcool 3.1.1
              </div>
              <div
                className="dropdown-item"
                onClick={() => changeBlock(id,"version","to Soundcool 3.1.2")}
              >
                to Soundcool 3.1.2
              </div>
            </div>
          </div>
        </div>

        <span className="row text-center m-2">
          <label htmlFor="channel" style={{ fontSize: "0.8rem" }}>
            MIDI Ch.
          </label>
          <input
            type="text"
            className="col-md-6 mx-2"
            style={{ height: "1.5rem", width: "3rem" }}
            id="channel"
            onChange={e => changeBlock(id,"channel",e.target.value)}
          />
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className=""
            style={{ height: "1.5rem", width: "3rem" }}
            id="osc"
            onChange={e => changeBlock(id,"osc",e.target.value)}
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
}
export default connect(
  mapStateToProps,
  { changeBlock }
)(VSTHost);
