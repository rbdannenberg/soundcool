import React from "react";
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
    givenName,
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
          height: "1rem",
          fontSize: "0.64rem",
          padding: "0px"
        }}
      />
    );
  } else {
    let style = {
      width: "1rem",
      height: "1rem",
      fontSize: "0.5rem",
      padding: "0px",
      border: "0px"
    };
    if (inNode[0] && inNode[0].length > 0) {
      console.log(inNode[0][0]);
      let backgroundColor = getCssPropById(inNode[0][1], "background-color");
      style = {
        ...style,
        backgroundColor
      };
    }
    inButton = (
      <button
        id="inButton"
        className="btn btn-light btn-sm m-1 text-center"
        onClick={() => {
          if (inNode[0] && inNode[0].length > 0) {
            dispatch({
              type: "DISCONNECTING_BLOCK",
              node: "nowIn",
              value: [name, "0", id, audioObj]
            });
          } else {
            dispatch({
              type: "CONNECTING_BLOCK",
              node: "nowIn",
              value: [name, "0", id, audioObj]
            });
          }
        }}
        onMouseEnter={() => {
          if (inNode[0] && inNode[0].length > 0) {
            let inId = inNode[0][1];
            var elem = document.getElementById(inId);
            elem.style.opacity = 0.5;
          }
        }}
        onMouseLeave={() => {
          if (inNode[0] && inNode[0].length > 0) {
            let inId = inNode[0][1];
            var elem = document.getElementById(inId);
            elem.style.opacity = 1;
          }
        }}
        onContextMenu={e => {
          e.preventDefault();
          if (inNode[0]) {
            focusElementById(inNode[0][0]);
            setCssPropById({ id: inNode[0][0], prop: "boxShadow", temp: true });
          }
        }}
        style={style}
      >
        <div>{inNode[0] && inNode[0].length > 0 ? inNode[0][0] : "In"}</div>
      </button>
    );
  }

  const style1 = {
    backgroundColor: "white",
    textAlign: "center",
    padding: "0px",
    width: "1rem",
    height: "1rem",
    fontSize: "0.5rem"
  };
  const circleStyle = {
    width: "1rem",
    height: "1rem",
    textAlign: "center",
    fontSize: "0.5rem",
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
    if (outNode[0] && outNode[0].length > 0) {
      let backgroundColor = "black";
      let color = "white";
      style = { ...style, backgroundColor, color };
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
        onMouseEnter={() => {
          if (outNode) {
            let outId;
            outNode.forEach(node => {
              if (node.length > 0) {
                outId = node[1];
                document.getElementById(outId).style.opacity = 0.5;
              }
            });
          }
        }}
        onMouseLeave={() => {
          if (outNode) {
            let outId;
            outNode.forEach(node => {
              if (node.length > 0) {
                outId = node[1];
                document.getElementById(outId).style.opacity = 1;
              }
            });
          }
        }}
      >
        <div>{"Out"}</div>
      </button>
    );
  }

  // console.log("hi");
  // console.log(Block.WrappedComponent);
  return (
    <div
      id={id}
      className="text-left my-1"
      style={{
        width: "13rem",
        backgroundColor: color,
        borderColor: "grey",
        borderStyle: "solid",
        borderWidth: "2px",
        //transformOrigin: "top left",
        //transform: "scale(0.8)"
        // clip: "rect(0px,60px,200px,0px)"
        // transform: "scale(0.8) translate(-32px, -30px)"
      }}
    >
      <div id={name}>
        <div className="">
          {draggableButton && (
            <strong className="cursor pointer-cursor ml-1">
              <FaArrowsAlt />
            </strong>
          )}
          {inButton}
          <span className="m-1" style={{ fontSize: "0.64rem" }} id="blockName">
            {name}
          </span>
          <input
            // className=""
            class="form-control badge-secondary badge-pill m-1"
            // placeholder={typeName}
            style={{
              fontSize: "0.64rem",
              color: "black",
              backgroundColor: "white",
              textAlign: "center",
              fontWeight: "bold",
              width: "4rem",
              height: "0.7rem",
              display: "inline"
            }}
            id="givenName"
            value={givenName}
            onChange={e => {
              dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "givenName",
                value: e.target.value
              });
            }}
          />
          <span className="float-right">
            <button
              id="collapseButton"
              className="btn btn-light btn-sm m-1 text-center"
              style={{
                width: "1rem",
                height: "1rem",
                fontSize: "0.4rem",
                padding: "0rem",
                border: "0.0625rem solid black"
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
              <FaMinus/>
            </button>

            <button
              id="closeButton"
              className="btn btn-light btn-sm m-1 text-center"
              style={{
                width: "1rem",
                height: "1rem",
                fontSize: "0.4rem",
                padding: "0rem",
                border: "0.0625rem solid black"
              }}
              onClick={() => {
                // handleDelete();
                dispatch({
                  type: "DELETE_BLOCK",
                  id: id
                });
              }}
            >
              <FaTimes/>
            </button>
            {outButton}
          </span>
        </div>
        <Collapse isOpen={collapse}>
          <div>
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
