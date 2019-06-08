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
        collpse: false
      },
      {
        id: 2,
        name: "D2",
        typename: "Pan",
        Type: Pan,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 3,
        name: "D3",
        typename: "Transposer",
        Type: Transposer,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 4,
        name: "D4",
        typename: "Delay",
        Type: Delay,
        in: null,
        out: null,
        collapse: false
      }
    ],
    nowIn: null,
    nowOut: null,
    nowId: 5
  };

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

  handleNewDelay = () => {
    const newB = {
      id: this.state.nowId,
      name: "D" + this.state.nowId,
      typename: "Delay",
      Type: Delay,
      in: null,
      out: null,
      collpse: false
    };
    const blocks = this.state.blocks;
    const newId = this.state.nowId + 1;
    blocks.push(newB);
    this.setState({ blocks, nowId: newId });
  };

  handleNewTransposer = () => {
    const newB = {
      id: this.state.nowId,
      name: "T" + this.state.nowId,
      typename: "Transposer",
      Type: Transposer,
      in: null,
      out: null,
      collpse: false
    };
    const blocks = this.state.blocks;
    const newId = this.state.nowId + 1;
    blocks.push(newB);
    this.setState({ blocks, nowId: newId });
  };

  handleNewPan = () => {
    const newB = {
      id: this.state.nowId,
      name: "P" + this.state.nowId,
      typename: "Pan",
      Type: Pan,
      in: null,
      out: null,
      collpse: false
    };
    const blocks = this.state.blocks;
    const newId = this.state.nowId + 1;
    blocks.push(newB);
    this.setState({ blocks, nowId: newId });
  };

  render() {
    return (
      <div className="App">
        <button className="btn btn-info m-2" onClick={this.handleSave}>
          Save
        </button>
        <button className="btn btn-info m-2" onClick={this.handleShow}>
          Load Saved
        </button>
        {/* <button className="btn btn-info m-2" onClick={this.handleNew}>
          New
        </button> */}
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
            <div class="dropdown-item" onClick={this.handleNewDelay}>
              Delay
            </div>
            <div class="dropdown-item" onClick={this.handleNewTransposer}>
              Transposer
            </div>
            <div class="dropdown-item" onClick={this.handleNewPan}>
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
