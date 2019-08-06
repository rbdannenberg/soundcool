import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import WithHeader from "../src/ui/Components/WithHeader";
import AddBlock from "./ui/Components/AddBlock";
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

const BlockList = ({ blocks, nowOut }) => {
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
      ))}
    </React.Fragment>
  );
};

class BlockApp extends React.Component {
  // { bs, nowOut } = this.props.blocks;

  componentDidMount() {
    console.log(window.location.href + "");
    console.log(window.location.href.toString());
    console.log(window.location.href.toString().substring(37));

    const projectId = window.location.href.toString().substring(37);

    store.dispatch({
      type: "LOAD_STATE",
      id: projectId
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {/* <SLButton />
      <ProjectPage /> */}

        {/* <SLButton /> */}
        <AddBlock />
        <BlockList
          blocks={this.props.blocks.bs}
          nowOut={this.props.blocks.nowOut}
        />
      </div>
    );
  }
}

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
