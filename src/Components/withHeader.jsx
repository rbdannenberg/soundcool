import React from "react";
import { Collapse } from "reactstrap";
import { FaMinus, FaTimes } from "react-icons/fa";
import { Delay, Transposer, Pan } from "./types/all";
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
    default:
      t = Delay;
  }
  return t;
};

const WithHeader = ({ blockInfo }) => {
  let { typeName, name, id, outNode, inNode, collapse } = blockInfo;
  const Block = eva(typeName);
  return (
    <div
      className="card text-left my-2"
      style={{
        width: "24rem",
        // backgroundColor: b.color,
        textDecorationColor: "black"
      }}
    >
      <div className="card-header">
        <button
          id="inButton"
          className="btn btn-warning m-1 btn-sm"
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
        <span className="m-2" id="blockName">
          {name}
        </span>
        <span className="badge badge-secondary badge-pill m-1" id="typeName">
          <h5>{typeName}</h5>
        </span>
        <span className="float-right">
          <button
            id="collapseButton"
            className="btn btn-light m-1 btn-sm"
            onClick={() =>
              store.dispatch({
                type: "CHANGE_BLOCK",
                id: id,
                field: "collapse",
                value: undefined
              })
            }
          >
            <FaMinus />
          </button>

          <button
            id="closeButton"
            className="btn btn-light m-1 btn-sm"
            onClick={() =>
              store.dispatch({
                type: "DELETE_BLOCK",
                id: id,
                field: undefined,
                value: undefined
              })
            }
          >
            <FaTimes />
          </button>

          <button
            id="outButton"
            className="btn btn-warning badge-right float-right m-1 btn-sm"
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
