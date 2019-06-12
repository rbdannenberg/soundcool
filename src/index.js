import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Delay, Transposer, Pan } from "./Components/types/all";
import { FaMinus, FaTimes } from "react-icons/fa";
import { Collapse } from "reactstrap";

import { createStore, combineReducers } from "redux";

// #region reducers
const block = (state, action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return {
        typeName: action.typeName,
        id: action.newId,
        name: action.typeName.charAt(0) + action.newTypeId,
        // contains generic values like in, out, collapse and also personal values
        ...action.values
      };
    case "CHANGE_BLOCK":
      if (state.id === action.id) {
        state.collapse = !state.collapse;
        return state;
      } else {
        return state;
      }
    default:
      return state;
  }
};

const allTypes = { Delay: 1, Transposer: 1, Pan: 1 };
const blocks = (
  state = { bs: [], nextBlockId: 1, nextTypeId: allTypes },
  action
) => {
  let { bs, nextBlockId, nextTypeId } = state;
  switch (action.type) {
    case "ADD_BLOCK": {
      // add the count information into action, so block knows the count when newing
      let newId = nextBlockId;
      let typeIds = { ...nextTypeId };
      let newTypeId = typeIds[action.typeName]++;
      let newAction = { ...action, newId, newTypeId };
      return {
        bs: [...bs, block(undefined, newAction)],
        nextBlockId: newId + 1,
        nextTypeId: typeIds
      };
    }
    case "CHANGE_BLOCK":
      return {
        bs: state.bs.map(t => block(t, action)),
        nextBlockId,
        nextTypeId
      };

    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const blockApp = combineReducers({
  blocks,
  visibilityFilter
});
// #endregion

const store = createStore(blockApp);

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

const getVisibleBlocks = (blocks, filter) => {
  switch (filter) {
    case "SHOW_ACTIVE":
      return blocks.filter(t => !t.completed);
    case "SHOW_COMPLETED":
      return blocks.filter(t => t.completed);
    default:
      return blocks;
  }
};

// #region rendering components
const Block = ({ block, onClick, completed }) => {
  let { typeName, name, id, outNode, inNode, collapse } = block;
  return (
    <div
      className="card text-white text-left my-2"
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
          // onClick={() => this.props.onIn(this.props.block)}
        >
          {inNode === null ? "In" : inNode.name}
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
                id: id
              })
            }
          >
            <FaMinus />
          </button>

          <button
            id="closeButton"
            className="btn btn-light m-1 btn-sm"
            // onClick={() => this.props.onDelete(this.props.block.id)}
          >
            <FaTimes />
          </button>

          <button
            id="outButton"
            className="btn btn-warning badge-right float-right m-1 btn-sm"
            // onClick={() => this.props.onOut(this.props.block)}
          >
            Out
          </button>
        </span>
      </div>
      <Collapse isOpen={collapse}>
        <p style={{ backgroundColor: "black" }}>ggg</p>
      </Collapse>
    </div>
  );
};

const BlockList = ({ blocks, onBlockClick }) => {
  return (
    <React.Fragment>
      {blocks.map(b => (
        <Block key={b.id} block={b} onClick={() => onBlockClick(b.id)} />
      ))}
    </React.Fragment>
  );
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
          <div
            class="dropdown-item"
            onClick={() =>
              store.dispatch({
                type: "ADD_BLOCK",
                typeName: "Delay",
                // id: nextBlockId++,
                values: {
                  inNode: null,
                  outNode: null,
                  collpse: false,
                  delayTime: 76,
                  feedback: 0.119,
                  kinect: false,
                  osc: 0
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
                  inNode: null,
                  outNode: null,
                  collpse: false,
                  buttonCents: 0,
                  sliderCents: 0,
                  osc: 0
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
                  inNode: null,
                  outNode: null,
                  collpse: false,
                  direction: 0,
                  kinect: false,
                  osc: 0
                }
              })
            }
          >
            Pan
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Footer = ({ visibilityFilter, onFilterClick }) => {
  return (
    <p>
      Show:{" "}
      <FilterLink
        filter="SHOW_ALL"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        ALL
      </FilterLink>{" "}
      <FilterLink
        filter="SHOW_ACTIVE"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Active
      </FilterLink>{" "}
      <FilterLink
        filter="SHOW_COMPLETED"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Completed
      </FilterLink>
    </p>
  );
};

// #endregion

const BlockApp = ({ blocks, visibilityFilter }) => {
  let { bs, nextBlockId, nextTypeId } = blocks;
  return (
    <div>
      <AddBlock />
      <BlockList
        // blocks={getVisibleBlocks(blocks, visibilityFilter)}
        blocks={bs}
        onBlockClick={id => {
          store.dispatch({
            type: "TOGGLE_BLOCK",
            id
          });
        }}
      />
      {/* <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter
          })
        }
      /> */}
    </div>
  );
};

const render = () => {
  ReactDOM.render(
    <BlockApp {...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// ReactDOM.render(<App />, document.getElementById("root"));
