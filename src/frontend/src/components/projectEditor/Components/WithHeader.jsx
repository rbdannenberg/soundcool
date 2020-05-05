import React from "react";
import { changeBlock, connectBlock } from "../../audioUI/actions";
import { connect } from "react-redux";
import { Collapse } from "reactstrap";
import { FaMinus, FaTimes, FaArrowsAlt } from "react-icons/fa";
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
  Spectroscope,
  Oscilloscope,
  Envelope,
  Filter,
  Keyboard,
  SamplePlayer,
  Sequencer,
  Reverb,
  GranSynth
  // #endregion
} from "../../audioUI/all";
import store from "../../../store";
import {
  getCssPropById,
  focusElementById,
  setCssPropById
} from "../../../actions/common";

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
    case "GranSynth":
      t = GranSynth;
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
    case "Spectroscope":
      t = Spectroscope;
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
    case "Reverb":
      t = Reverb;
      break;
    default:
      t = <span>No setup yet!</span>;
  }
  return t;
};

const WithHeader = ({
  blockInfo,
  draggableButton,
  nowOut,
  handleDelete,
  dispatch
}) => {
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
    let style = {
      width: "1.5rem",
      height: "1.5rem",
      fontSize: "0.8rem",
      padding: "0px",
      border: "0px"
    };
    if (inNode[0]) {
      let backgroundColor = getCssPropById(inNode[0][0], "background-color");
      style = { ...style, backgroundColor };
      console.log(style);
    }
    inButton = (
      <button
        id="inButton"
        className="btn btn-light btn-sm m-1 text-center"
        style={style}
        onClick={() => {
          dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowIn",
            value: [name, "0", id, audioObj]
          });
        }}
        onContextMenu={e => {
          e.preventDefault();
          if (inNode[0]) {
            focusElementById(inNode[0][0]);
            setCssPropById({ id: inNode[0][0], prop: "boxShadow", temp: true });
          }
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
    let style = outId === id ? { ...circleStyle } : { ...style1 };
    if (outNode[0]) {
      let backgroundColor = getCssPropById(outNode[0][0], "background-color");
      style = { ...style, backgroundColor };
    }
    outButton = (
      <button
        id="outButton"
        className="btn btn-sm text-center m-1"
        style={style}
        onContextMenu={e => {
          e.preventDefault();
          if (outNode[0]) {
            focusElementById(outNode[0][0]);
            setCssPropById({
              id: outNode[0][0],
              prop: "boxShadow",
              temp: true
            });
          }
        }}
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "CONNECTING_BLOCK",
            node: "nowOut",
            value: [name, "0", id, audioObj]
          });
        }}
      >
        <div>{outNode[0] === undefined ? "Out" : outNode[0][0]}</div>
      </button>
    );
  }

  console.log("hi");
  console.log(Block.WrappedComponent);
  return (
    <div
      id={name}
      className="text-left my-1"
      style={{
        width: "20rem",
        backgroundColor: color,
        borderColor: "grey",
        borderStyle: "solid",
        borderWidth: "2px",
        transformOrigin: "top left",
        transform: "scale(0.8)",
        clip: "rect(0px,60px,200px,0px)"
        // transform: "scale(0.8) translate(-32px, -30px)"
      }}
    >
      <div>
        <div className="">
          {draggableButton && (
            <strong className="cursor pointer-cursor ml-1">
              <FaArrowsAlt />
            </strong>
          )}
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
                dispatch({
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
              onClick={() => {
                // handleDelete();
                dispatch({
                  type: "DELETE_BLOCK",
                  id: id
                });
              }}
            >
              <FaTimes style={{ marginLeft: "-1px" }} />
            </button>
            {outButton}
          </span>
        </div>
        <Collapse isOpen={collapse}>
          <div style={{ height: "80%" }}>
            <Block blockInfo={blockInfo} />
          </div>
        </Collapse>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps)(WithHeader);
