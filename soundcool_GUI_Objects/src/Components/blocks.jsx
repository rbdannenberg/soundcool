import React, { Component } from "react";
import { Delay, Transposer, Pan } from "./types/all";
import withHeader from "./WithHeader";

class Blocks extends Component {
  state = {};

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

  render() {
    return (
      <div>
        {this.props.blocks.map(b => {
          const Wrapper = withHeader(this.eva(b.typename));
          return (
            <Wrapper
              key={b.id}
              block={b}
              onDelete={this.props.onDelete}
              onIn={this.props.onIn}
              onOut={this.props.onOut}
              collapse={this.props.collapse}
              connection={this.props.connection}
            />
          );
        })}
      </div>
    );
  }
}

export default Blocks;
