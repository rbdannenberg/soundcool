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
            flexDirection: "row", // 更改为水平布局
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "pink",
            minHeight: "100vh",
          }}
        >
          {/* 主内容区域 */}
          <div style={{ flex: 1, padding: "20px" }}>
            {/* 主内容区域内的元素... */}
          </div>

          {/* 音量控制区域，现在在所有组件的右边 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div className="volume-meter" style={{ width: "10px", minHeight: "80px", marginTop:"10px", backgroundColor: "black" }}>
              <canvas ref={this.canvasMeterRef} style={{ height: "60px" }} />
            </div>
            <div
              className="volume-control"
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
              }}
            >
              {"Vol. " + blockInfo.volume}
              <input
                className="slider text-center"
                orient="vertical"
                type="range"
                style={{ width: "1.5rem", height: "80px"}}
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
      </React.Fragment>
    );
  }
}

export default Player;
