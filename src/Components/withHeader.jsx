import React from "react";
import { Collapse } from "reactstrap";
import { FaMinus, FaTimes } from "react-icons/fa";
import {
  Delay,
  Transposer,
  Pan,
  Player,
  SignalGen,
  Speaker,
  DirectInput,
  Pitch,
  VSTHost
} from "./types/all";
import store from "../index";

const buttonStyle = {
  width: "2rem",
  height: "2rem"
};

const eva = typeName => {
  let t;
  switch (typeName) {
    case "Delay":
      t = Delay;
      break;
    case "Transposer":
      t = Transposer;
      break;
    case "Pan":
      t = Pan;
      break;
    case "Player":
      t = Player;
      break;
    case "SignalGen":
      t = SignalGen;
      break;
    case "Speaker":
      t = Speaker;
      break;
    case "DirectInput":
      t = DirectInput;
      break;
    case "Pitch":
      t = Pitch;
      break;
    case "VSTHost":
      t = VSTHost;
      break;
    default:
      t = <span>No setup yet!</span>;
  }
  return t;
};

const WithHeader = ({ blockInfo }) => {
  let {
    typeName,
    name,
    id,
    inDisabled,
    outDisabled,
    outNode,
    inNode,
    collapse,
    color
  } = blockInfo;
  const Block = eva(typeName);
  let inButton;
  let outButton;

  // conditionally render in and out buttons in the header
  if (inDisabled) {
    inButton = <span />;
  } else {
    inButton = (
      <button
        id="inButton"
        className="btn btn-warning btn-sm m-1"
        style={{ width: "2rem", height: "2rem", fontSize: "0.8rem" }}
        onClick={() => {
          store.dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowIn",
            value: name
          });
        }}
      >
        {inNode === undefined ? "In" : inNode}
      </button>
    );
  }

  if (outDisabled) {
    outButton = <span />;
  } else {
    outButton = (
      <button
        id="outButton"
        className="btn btn-warning btn-sm text-center m-1"
        style={{ width: "2.5rem", height: "2rem", fontSize: "0.8rem" }}
        onClick={() =>
          store.dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowOut",
            value: name
          })
        }
      >
        {outNode === undefined ? "Out" : outNode}
      </button>
    );
  }

  return (
    <div
      className="text-left my-2"
      style={{
        width: "18rem",
        backgroundColor: color,
        textDecorationColor: "black"
      }}
    >
      <div className="">
        {inButton}
        <span className="m-1" style={{ fontSize: "0.8rem" }} id="blockName">
          {name}
        </span>
        <span
          className="badge badge-secondary badge-pill m-1"
          style={{ fontSize: "0.7rem" }}
          id="typeName"
        >
          <h6>{typeName}</h6>
        </span>
        <span className="float-right">
          <button
            id="collapseButton"
            className="btn btn-light m-1 btn-sm"
            style={{ width: "1.5rem", height: "1.5rem", fontSize: "1rem" }}
            onClick={() =>
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "collapse",
                value: undefined
              })
            }
          >
            -{/* <FaMinus /> */}
          </button>

          <button
            id="closeButton"
            className="btn btn-light m-1 btn-sm"
            style={{ width: "1.5rem", height: "1.5rem", fontSize: "1rem" }}
            onClick={() =>
              store.dispatch({
                type: "DELETE_BLOCK",
                id: id,
                field: undefined,
                value: undefined
              })
            }
          >
            x{/* <FaTimes /> */}
          </button>
          {outButton}
        </span>
      </div>
      <Collapse isOpen={collapse}>
        <Block blockInfo={blockInfo} />
        {/* <p style={{ backgroundColor: "black" }}>ggg</p> */}
      </Collapse>
    </div>
  );
};

export default WithHeader;
