import React from "react";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";

const circleStyle = {
  width: "1.25rem",
  height: "1.25rem",
  textAlign: "center",
  padding: "1px",
  fontSize: "1.25rem",
  borderRadius: "5rem",
  borderColor: "black",
  borderStyle: "solid",
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.canvasMeterRef = React.createRef();
    this.canvasSeekRef = React.createRef();
    this.state = {
      isLoaded: false,
      isPlaying: false,
      blockInfo: {
        speed: 1,
        audioObj: {
          options: { loop: false },
        },
        inDisabled: false,
        volume: 100,
        oscPort: null,
      },
    };
  }

  render() {
    const { blockInfo } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "pink",
            minHeight: "100vh",
          }}
        >
          {/* Main content area (left side) */}

          <button type="button" class="btn btn-primary">Primary</button>
          <div style={{ flex: 1, padding: "5rem" }}>
            <div className="speed-display" style={{ marginBottom: "2rem",marginTop:"5rem"}}>
              Speed: {blockInfo.speed}
            </div>

            <input
              className="slider mx-1 my-2 text-center"
              type="range"
              style={{ width: "40rem" }}
              min={0.01}
              max={2}
              step={0.01}
              value={blockInfo.speed}
              id="speed"
              readOnly
            />
           

            <div
              className="multiplier-buttons"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginBottom: "5rem",
                marginLeft:"-7rem",
              }}
            >
              <div style={{ cursor: "pointer", border: "1px solid", width: "2.5rem", fontSize: "0.74rem" }}>
                &#215;0.01
              </div>
              <div style={{ cursor: "pointer", border: "1px solid", width: "1.25rem", fontSize: "0.74rem" }}>
                &#215;1
              </div>
              <div style={{ cursor: "pointer", border: "1px solid", width: "1.25rem", fontSize: "0.74rem" }}>
                &#215;2
              </div>
            </div>

            <div
              className="progress-bar" 
              style={{
                width: "40rem",
                backgroundColor: "black",
                height: "1rem",
                marginBottom: "2rem",
              }}
            >
              <canvas style={{ width: "100%", height: "100%" }} ref={this.canvasSeekRef} />
            </div>

            <div className="time-display" style={{ marginBottom: "20px" }}>
              00:00:00
            </div>

            <div
              className="controls"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginBottom: "-20rem",
                marginLeft:"-7rem",
              }}
            >
              <button
                disabled={blockInfo.inDisabled}
                className="btn btn-light m-1"
                style={{
                  ...circleStyle,
                  width: "2rem", 
                  height: "2rem",
                  padding: "4px",
                  fontSize: "1.5rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                }}
                onClick={() => {}}
              >
                <FaPlay style={{ fontSize: "0.64rem" }} /> 
              </button>
              <button
                disabled={blockInfo.inDisabled}
                className="btn btn-light btn-circle m-1"
                style={{
                  ...circleStyle,
                  width: "2rem",
                  height: "2rem", 
                  padding: "4px", 
                  fontSize: "1.5rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                }}
                onClick={() => {}}
              >
                <FaSquare style={{ fontSize: "0.64rem" }} />
              </button>
              <button
                disabled={blockInfo.inDisabled}
                className="btn btn-light btn-circle m-1"
                style={{
                  ...circleStyle,
                  width: "2rem", 
                  height: "2rem",
                  padding: "4px", 
                  fontSize: "1.5rem", 
                  display: "flex",
                  alignItems: "center", 
                  justifyContent: "center", 
                }}
                onClick={() => {}}
              >
                <FaPlay style={{ fontSize: "0.64rem", marginLeft: "-2px" }} />
              </button>

              
            </div>
             {/* Volume Meter and Control */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10rem" }}>
              <div className="volume-meter" style={{ width: "1rem", minHeight: "10rem", marginTop:"1rem",marginLeft:"44rem",backgroundColor: "black" }}>
                <canvas ref={this.canvasMeterRef} style={{ height: "10rem" }} />
              </div>
              <div
                className="volume-control"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft:"1rem",
                }}
              >
                {"Vol. " + blockInfo.volume}
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{ width: "1.5rem", height: "10rem"}}
                  min={0}
                  max={100}
                  step={1}
                  value={blockInfo.volume}
                  id="volume"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Player;
