import React, { Component } from "react";
import { Delay, Transposer, Pan } from "./Components/types/all";
import Blocks from "./Components/blocks";
import "./App.css";

class App extends Component {
  // the state is the current configuration
  state = {
    blocks: [
      {
        id: 1,
        name: "D1",
        typename: "Delay",
        Type: Delay,
        in: null,
        out: null,
        collpse: false,
        delayTime: 76,
        feedback: 0.119,
        kinect: false,
        osc: 0
      },
      {
        id: 2,
        name: "P1",
        typename: "Pan",
        Type: Pan,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 3,
        name: "T1",
        typename: "Transposer",
        Type: Transposer,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 4,
        name: "D2",
        typename: "Delay",
        Type: Delay,
        in: null,
        out: null,
        collapse: false
      }
    ],
    nowIn: null,
    nowOut: null,
    nowId: 5,
    nowCount: { Delay: 3, Transposer: 2, Pan: 2 }
  };

  eva = typeName => {
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

  // Blocks property methods
  // #region
  handleDelete = id => {
    const blocks = this.state.blocks.filter(c => c.id !== id);
    this.setState({ blocks });
  };

  handleIn = b => {
    const blocks = [...this.state.blocks];
    const index = blocks.indexOf(b);
    this.setState({ nowIn: b });
    const thisIn = this.state.nowOut === (null || b) ? null : this.state.nowOut;
    blocks[index] = { ...b };
    blocks[index].in = thisIn;
    this.setState({ blocks });
  };

  handleOut = b => {
    this.setState({ nowOut: b });
  };

  handleCollapse = b => {
    const blocks = [...this.state.blocks];
    const index = blocks.indexOf(b);
    blocks[index] = { ...b };
    blocks[index].collapse = !blocks[index].collapse;
    this.setState({ blocks });
  };

  handleSave = () => {
    localStorage.setItem("myState", JSON.stringify(this.state));
  };

  handleShow = () => {
    let state = localStorage.getItem("myState");
    this.setState(JSON.parse(state));
  };

  handleNew = typeName => {
    const newB = {
      id: this.state.nowId,
      name: typeName.charAt(0) + this.state.nowCount[typeName],
      typename: typeName,
      Type: this.eva(typeName),
      in: null,
      out: null,
      collpse: false
    };
    const blocks = this.state.blocks;
    const newId = this.state.nowId + 1;
    const c = this.state.nowCount;
    c[typeName] = c[typeName] + 1;
    const newCount = c;
    blocks.push(newB);
    this.setState({ blocks, nowId: newId, nowCount: newCount });
  };
  // #endregion

  // Delay property methods
  // #region
  handleChangeDelay = (e, b) => {
    const blocks = { ...this.state.blocks };
    const index = this.state.blocks.indexOf(b);
    blocks[index] = { ...b };
    blocks[index].delayTime = e.target.value;
    this.setState({
      blocks
    });
  };

  handleChangeFeedback = e => {
    this.setState({
      feedback: e.target.value
    });
  };

  handleKinect = e => {
    const k = this.props.blocks.kinect;
    this.setState({
      kinect: !k
    });
  };

  handleOsc = e => {
    this.setState({
      osc: e.target.value
    });
  };

  // #endregion

  render() {
    return (
      <div className="App">
        <button className="btn btn-info m-2" onClick={this.handleSave}>
          Save
        </button>
        <button className="btn btn-info m-2" onClick={this.handleShow}>
          Load Saved
        </button>
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
            <div class="dropdown-item" onClick={() => this.handleNew("Delay")}>
              Delay
            </div>
            <div
              class="dropdown-item"
              onClick={() => this.handleNew("Transposer")}
            >
              Transposer
            </div>
            <div class="dropdown-item" onClick={() => this.handleNew("Pan")}>
              Pan
            </div>
          </div>
        </div>

        <main className="container">
          <Blocks
            blocks={this.state.blocks}
            connection={[this.state.nowIn, this.state.nowOut]}
            onDelete={this.handleDelete}
            onIn={this.handleIn}
            onOut={this.handleOut}
            collapse={this.handleCollapse}
          />
        </main>
      </div>
    );
  }
}

export default App;
