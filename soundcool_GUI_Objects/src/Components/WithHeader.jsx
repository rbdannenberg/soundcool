import React from "react";
import { Collapse } from "reactstrap";
import { FaMinus, FaTimes } from "react-icons/fa";
import {
  // #region all types
  Delay,
  Transposer,
  Pan,
  Player,
  SignalGen,
  Speaker,
  DirectInput,
  Pitch,
  VSTHost,
  Routing,
  Mixer,
  Record,
  Spectralscope,
  Oscilloscope,
  Envelope,
  Filter,
  Keyboard,
  SamplePlayer,
  Sequencer
  // #endregion
} from "./types/all";
import store from "../index";

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
    case "Routing":
      t = Routing;
      break;
    case "Mixer":
      t = Mixer;
      break;
    case "Record":
      t = Record;
      break;
    case "Spectralscope":
      t = Spectralscope;
      break;
    case "Oscilloscope":
      t = Oscilloscope;
      break;
    case "Envelope":
      t = Envelope;
      break;
    case "Filter":
      t = Filter;
      break;
    case "Keyboard":
      t = Keyboard;
      break;
    case "SamplePlayer":
      t = SamplePlayer;
      break;
    case "Sequencer":
      t = Sequencer;
      break;
    default:
      t = <span>No setup yet!</span>;
  }
  return t;
};

const WithHeader = ({ blockInfo, nowOut }) => {
  let {
    typeName,
    name,
    id,
    audioObj,
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
    inButton = (
      // nothing, placeholder
      <div
        className="btn btn-sm m-1 text-center"
        style={{
          // width: "1.5rem",
          height: "1.5rem",
          fontSize: "0.8rem",
          padding: "0px"
        }}
      />
    );
  } else {
    inButton = (
      <button
        id="inButton"
        className="btn btn-light btn-sm m-1 text-center"
        style={{
          width: "1.5rem",
          height: "1.5rem",
          fontSize: "0.8rem",
          padding: "0px"
        }}
        onClick={() => {
          store.dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowIn",
            value: [name, "0", id, audioObj]
          });
        }}
      >
        <div>{inNode[0] === undefined ? "In" : inNode[0][0]}</div>
      </button>
    );
  }

  const style1 = {
    backgroundColor: "white",
    textAlign: "center",
    padding: "0px",
    width: "1.5rem",
    height: "1.5rem",
    fontSize: "0.8rem"
  };
  const circleStyle = {
    width: "1.5rem",
    height: "1.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
    padding: "0px",
    lineHeight: 1.428571429,
    borderRadius: "0.5rem",
    borderColor: "black",
    backgroundColor: "white"
  };

  const outId = nowOut === undefined ? undefined : nowOut[2];

  if (outDisabled) {
    outButton = <span />;
  } else {
    outButton = (
      <button
        id="outButton"
        className="btn btn-sm text-center m-1"
        style={outId === id ? circleStyle : style1}
        onClick={() =>
          store.dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowOut",
            value: [name, "0", id, audioObj]
          })
        }
      >
        <div>{outNode[0] === undefined ? "Out" : outNode[0][0]}</div>
      </button>
    );
  }

  return (
    <div
      className="text-left my-2"
      style={{
        width: "20rem",
        backgroundColor: color,
        borderColor: "grey",
        borderStyle: "solid",
        borderWidth: "2px"
      }}
    >
      <div className="">
        {inButton}
        <span className="m-1" style={{ fontSize: "0.8rem" }} id="blockName">
          {name}
        </span>
        <span
          className="badge badge-secondary badge-pill m-1"
          style={{ fontSize: "0.8rem" }}
          id="typeName"
        >
          {typeName}
        </span>
        <span className="float-right">
          <button
            id="collapseButton"
            className="btn btn-light btn-sm m-1 text-center"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "0.4rem"
            }}
            onClick={() =>
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "collapse",
                value: undefined
              })
            }
          >
            <FaMinus style={{ marginLeft: "-1px" }} />
          </button>

          <button
            id="closeButton"
            className="btn btn-light btn-sm m-1 text-center"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "0.4rem"
            }}
            onClick={() =>
              store.dispatch({
                type: "DELETE_BLOCK",
                id: id,
                field: undefined,
                value: undefined
              })
            }
          >
            <FaTimes style={{ marginLeft: "-1px" }} />
          </button>
          {outButton}
        </span>
      </div>
      <Collapse isOpen={collapse}>
        <Block blockInfo={blockInfo} />
      </Collapse>
    </div>
  );
};

export default WithHeader;
