import React, { Component } from "react";
import { Delay, Transposer, Pan } from "./types/all";
import withHeader from "./withHeader";

class Blocks extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.blocks.map(b => {
          let t;
          switch (b.typename) {
            case "Delay":
              t = Delay;
              break;
            case "Transposer":
              t = Transposer;
              break;
            case "Pan":
              t = Pan;
              break;
          }
          const Wrapper = withHeader(t);
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
