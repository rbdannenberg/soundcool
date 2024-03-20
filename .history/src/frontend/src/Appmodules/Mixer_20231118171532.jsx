import React, { Component } from "react";

class Mixer extends Component {
  constructor(props) {
    super(props);
    this.canvasGain6LRef = React.createRef();
    this.canvasGain6RRef = React.createRef();
  }

  componentDidMount() {}

  render() {
    const { id, node6Gain, changeBlock } = this.props;
    //background color

    return (
      <div
        className=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(8, 206, 255)"
        }}
      >
        <React.Fragment>

          <button //Component 1
            style={{
              position: "absolute",
              top: "40px",
              left: "320px"
            }}
          >
            1. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "340px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "380px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "410px",
                top: "-36px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <button // component 2
            style={{
              position: "absolute",
              top: "40px",
              left: "490px"
            }}
          >
            2. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "540px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "500px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "580px",
                top: "-36px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node2Gain"
            />
          </div>

          <button //Component 7
            style={{
              position: "absolute",
              top: "40px",
              left: "660px"
            }}
          >
            3. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "670px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "710px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "750px",
                top: "-36px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <button //Component 4
            style={{
              position: "absolute",
              top: "340px",
              left: "820px"
            }}
          >
            8. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "820px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "850px",
                top: "64px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "890px",
                top: "-36px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <button //Component 4
            style={{
              position: "absolute",
              top: "40px",
              left: "820px"
            }}
          >
            4. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "820px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "850px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "890px",
                top: "267px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <button //Component 7
            style={{
              position: "absolute",
              top: "340px",
              left: "660px"
            }}
          >
            7. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "670px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "710px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "750px",
                top: "267px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <button // component 6
            style={{
              position: "absolute",
              top: "340px",
              left: "490px"
            }}
          >
            6. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "540px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "500px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "580px",
                top: "267px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node2Gain"
            />
          </div>
          <button                           //Component 5
            style={{
              position: "absolute",
              top: "340px",
              left: "320px"
            }}
          >
            5. In
          </button>
          <div className="">
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "340px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "380px",
                top: "364px",
                minHeight: "180px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "11.8rem",
                height: "184px",
                position: "absolute",
                left: "410px",
                top: "267px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>

          <div className="">       
            <div
              className="progress progress-bar-vertical" // max compentent 
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "940px",
                top: "64px",
                minHeight: "480px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6LRef} />
            </div>
            <div
              className="progress progress-bar-vertical"
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "8px",
                left: "980px",
                top: "64px",
                minHeight: "480px"
              }}
            >
              <canvas height="80" ref={this.canvasGain6RRef} />
            </div>
            <input
              className="slider text-center" //slider
              orient="vertical"
              type="range"
              style={{
                width: "30rem",
                height: "10px",
                position: "absolute",
                left: "1010px",
                top: "57px",
                transform: "rotate(90deg)",
                transformOrigin: "left center"
              }}
              onChange={(e) => {
                changeBlock(id, "node6Gain", e.target.value);
              }}
              min={0}
              max={1}
              step={0.01}
              value={node6Gain}
              id="node1Gain"
            />
          </div>


        </React.Fragment>
      </div>
    );
  }
}

export default Mixer;
