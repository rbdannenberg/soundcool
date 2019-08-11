import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import WithHeader from "./ui/Components/WithHeader";
import AddBlock from "./ui/Components/AddBlock";
import SLButton from "./ui/Components/SLButton";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";

const blockApp = combineReducers({
  blocks
});
// #endregion

export const store = createStore(blockApp);

const BlockList = ({ blocks, nowOut }) => {
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
      ))}
    </React.Fragment>
  );
};

class ProjectEditor extends React.Component {
  // { bs, nowOut } = this.props.blocks;
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({ ...store.getState() });
    });
    this.state = { ...store.getState(), projectId: this.props.match.params.id };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id)
      this.setState({ projectId: nextProps.match.params.id }, () => {
        this.loadState();
      });
  }

  loadState() {
    console.log(this.state.projectId);
    store.dispatch({
      type: "LOAD_STATE",
      id: this.state.projectId
    });
  }
  componentDidMount() {
    this.loadState();
  }

  render() {
    return (
      <div className="container">
        {/* <SLButton />
      <ProjectPage /> */}

      <button
        className="btn btn-info m-2"
        onClick={() => {
          store.dispatch({
            type: "SAVE_STATE",
            id: this.state.projectId
          });
        }}
      >
        Save
      </button>
        <AddBlock />
        <BlockList
          blocks={this.state.blocks.bs}
          nowOut={this.state.blocks.nowOut}
        />
      </div>
    );
  }
}

export default ProjectEditor;
