import React, { Component } from "react";
import { FaPlay, FaSquare } from "react-icons/fa"; // Include other icons if needed

class Mixer extends Component {
  constructor(props) {
    super(props);
    this.canvasGainRef = React.createRef();
  }

  componentDidMount() {}

  render() {
    const { id, nodeGain, changeBlock } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(8, 206, 255)"
        }}
      >
        {/* Mixer tracks organized into two horizontal rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map(track => (
          <div key={track} style={{ display: "flex", alignItems: "center", margin: "10px", width: "25%" }}>
            <button style={{ marginRight: "10px" }}>{track}. In</button>
            <div
              className="progress progress-bar-vertical"
              style={{ backgroundColor: "black", width: "8px", height: "180px" }}
            >
              <canvas height="80" ref={this.canvasGainRef} />
            </div>

            <input
              className="slider text-center"
              orient="vertical"
              type="range"
              style={{ width: "1.5rem", height: "180px", margin: "0 10px" }}
              onChange={(e) => changeBlock(id, "nodeGain", e.target.value)}
              min={0}
              max={1}
              step={0.01}
              value={nodeGain}
              id={`nodeGain${track}`}
            />
            </div>
        ))}
        {/* Larger slider on the right */}
        <div style={{ width: "5rem", margin: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <label style={{ marginBottom: "10px" }}>Master Volume</label>
          <input
            ref={this.largeSliderRef}
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{ height: "300px", cursor: "pointer" }}
            onChange={(e) => changeBlock(id, "masterVolume", e.target.value)}
            min={0}
            max={1}
            step={0.01}
            value={nodeGain} // Adjust this based on your state management for the master volume
            id="masterVolume"
          />
        </div>
      </div>
    );
  }
}

export default Mixer;
      
    