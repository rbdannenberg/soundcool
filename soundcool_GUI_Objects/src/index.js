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

// #endregion

const BlockApp = ({ blocks }) => {
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
