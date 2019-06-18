import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import { Delay, Transposer, Pan } from "./Components/types/all";
import WithHeader from "./Components/WithHeader";
import AddBlock from "./Components/AddBlock";
import SLButton from "./Components/SLButton";
import blocks from "./reducers/blocks";
import { createStore, combineReducers } from "redux";

// #region reducers

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

const BlockList = ({ blocks, nowOut }) => {
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
      ))}
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
  let { bs, nowOut } = blocks;
  return (
    <div>
      <SLButton />
      <AddBlock />
      <BlockList blocks={bs} nowOut={nowOut} />
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
