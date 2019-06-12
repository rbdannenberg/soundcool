import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import { Delay, Transposer, Pan } from "./Components/types/all";
import WithHeader from "../src/Components/withHeader";
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
        {
          if (action.value === undefined) {
            state[action.field] = !state[action.field];
          } else if (action.relative) {
            state[action.field] = state[action.field] + action.value;
          } else {
            state[action.field] = action.value;
          }
        }
        return state;
      } else {
        return state;
      }
    // deal with breaking connections when blocks are deleted
    case "DELETE_BLOCK":
      console.log("here");
      let newInNode;
      let newOutNode;
      if (
        state.inNode !== undefined &&
        action.blocks.filter(t => t.name === state.inNode).length === 0
      ) {
        newInNode = undefined;
      } else {
        newInNode = state.inNode;
      }
      if (
        state.outNode !== undefined &&
        action.blocks.filter(t => t.name === state.outNode).length === 0
      ) {
        newOutNode = undefined;
      } else {
        newOutNode = state.outNode;
      }
      return { ...state, inNode: newInNode, outNode: newOutNode };

    case "CONNECTING_BLOCK":
      if (state.name === action.nowIn) {
        if (state.name === action.nowOut) {
          return state;
        } else {
          return { ...state, inNode: action.nowOut };
        }
      } else {
        if (state.name === action.nowOut) {
          return { ...state, outNode: action.nowIn };
        } else {
          return state;
        }
      }

    default:
      return state;
  }
};

const allTypes = { Delay: 1, Transposer: 1, Pan: 1 };
const blocks = (
  state = {
    bs: [],
    nextBlockId: 1,
    nextTypeId: allTypes,
    nowIn: undefined,
    nowOut: undefined
  },
  action
) => {
  let { bs, nextBlockId, nextTypeId, nowIn, nowOut } = state;
  switch (action.type) {
    case "ADD_BLOCK": {
      // add the count information into action, so block knows the count when newing
      let newId = nextBlockId;
      let typeIds = { ...nextTypeId };
      let newTypeId = typeIds[action.typeName]++;
      let newAction = { ...action, newId, newTypeId };
      return {
        nowIn,
        nowOut,
        bs: [...bs, block(undefined, newAction)],
        nextBlockId: newId + 1,
        nextTypeId: typeIds
      };
    }
    case "CHANGE_BLOCK":
      return {
        nextBlockId,
        nextTypeId,
        nowIn,
        nowOut,
        bs: bs.map(t => block(t, action))
      };
    case "DELETE_BLOCK":
      let filteredBs = bs.filter(t => t.id !== action.id);
      let newBs = filteredBs.map(t =>
        block(t, { ...action, blocks: filteredBs })
      );
      return {
        nextBlockId,
        nextTypeId,
        nowIn,
        nowOut,
        bs: newBs
      };
    case "CONNECTING_BLOCK":
      let s = { ...state };
      // in or out?
      s[action.node] = action.value;
      // if both nowIn and nowOut are assigned and the blocks exists
      if (
        s.nowIn !== undefined &&
        s.nowOut !== undefined &&
        s.bs.filter(t => t.name === s.nowIn).length === 1 &&
        s.bs.filter(t => t.name === s.nowOut).length === 1
      ) {
        return {
          ...s,
          bs: s.bs.map(t =>
            block(t, { ...action, nowIn: s.nowIn, nowOut: s.nowOut })
          )
        };
      } else {
        return s;
      }

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
export default store;

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

const BlockList = ({ blocks, onBlockClick }) => {
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} />
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
                  inNode: undefined,
                  outNode: undefined,
                  collapse: false,
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
                  direction: 0,
                  kinect: false,
                  osc: undefined
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
  let { bs } = blocks;
  return (
    <div>
      <AddBlock />
      <BlockList
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
