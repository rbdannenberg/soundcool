import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import { Delay, Transposer, Pan } from "./Components/types/all";
// import AddBlock from "./ui/Components/AddBlock";
import SLButton from "./ui/Components/SLButton";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";
import ProjectPage from "./ui/component_pp/ProjectPage";
// #region reducers

const blockApp = combineReducers({
  blocks
});
// #endregion

const store = createStore(blockApp);
export default store;

// #region rendering components

// #endregion

const BlockApp = ({ blocks }) => {
  // let {} = blocks;
  return (
    <div>
      <SLButton />
      {/* <AddBlock /> */}
      <ProjectPage />
    </div>
  );
  // return (<NavigationBar/>)
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