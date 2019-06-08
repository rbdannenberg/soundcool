import React, { Component } from "react";
import { Collapse } from "reactstrap";

const withHeader = Block => {
  class WithHeader extends Component {
    render() {
      // need to instantiate the class to get property
      let b = new Block();
      return (
        <div
          className="card text-white text-left my-2"
          style={{
            width: "22rem",
            backgroundColor: b.color,
            textDecorationColor: "black"
          }}
        >
          <div className="card-header">
            <button
              id="inButton"
              className="btn btn-warning m-1 btn-sm"
              onClick={() => this.props.onIn(this.props.block)}
            >
              {this.props.block.in === null ? "In" : this.props.block.in.name}
            </button>
            <span className="m-2" id="blockName">
              {this.props.block.name}
            </span>
            <span
              className="badge badge-secondary badge-pill m-1"
              id="typeName"
            >
              <h5>{this.props.block.typename}</h5>
            </span>
            <button
              id="collapseButton"
              className="btn btn-light float-right m-1 btn-sm"
              onClick={() => this.props.collapse(this.props.block)}
            >
              _
            </button>
            <button
              id="closeButton"
              className="btn btn-light float-right m-1 btn-sm"
              onClick={() => this.props.onDelete(this.props.block.id)}
            >
              X
            </button>

            <button
              id="outButton"
              className="btn btn-warning badge-right float-right m-1 btn-sm"
              onClick={() => this.props.onOut(this.props.block)}
            >
              Out
            </button>
            {/* in\out\name\close */}
          </div>
          <Collapse isOpen={this.props.block.collapse}>
            <Block />
          </Collapse>
        </div>
      );
    }
  }

  return WithHeader;
};

export default withHeader;
