import React from "react";
import { FaPlay, FaSquare } from "react-icons/fa";

const circleStyle = {
  width: "2rem", // Increased width
  height: "2rem", // Increased height
  textAlign: "center",
  padding: "0px",
  fontSize: "1rem", // Increased font size
  borderRadius: "1rem", // Increased border radius
  borderColor: "black",
};

const IndividualPlayer = ({ num }) => {
  // Rest of code for IndividualPlayer component
  // ...

  return (
    <div
      style={{
        position: "relative",
        borderColor: "white",
        minWidth: "140px", // Minimum width
        minHeight: "280px", // Minimum height
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <div style={{ position: "absolute", left: "2px", fontSize: "0.8rem" }}>
        {num + 1}
      </div>
      <button
     
        className="btn btn-light m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "8px",
          left: "0.25rem",
        }}
        onClick={() => {}}
      >
        <FaPlay style={{ fontSize: "12px", marginLeft: "2.5px" }} />
      </button>
      <button
        className="btn btn-light btn-circle m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "100px",
          left: "0.25rem",
        }}
        onClick={() => {}}
      >
        <FaSquare style={{ fontSize: "12px" }} />
      </button>
      <div
        style={{
          position: "absolute",
          top: "3.9375rem",
          left: "-0.1875rem",
          webkitTransform: "scale(0.8)",
        }}
      >
        {/* Placeholder for AddSound component */}
        {/* AddSound Component */}
      </div>
    </div>
  );
};

const SamplePlayer = () => {
  // Dummy blockInfo object
  const blockInfo = {
    id: 1, // Dummy ID
    speed: 1.0, // Dummy speed value
    random: false, // Dummy random value
    loop: false, // Dummy loop value
    masterVolume: 50, // Dummy masterVolume value
  };

  return (
    <React.Fragment>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "pink",
          minHeight: "100vh", // Fills the entire viewport height
        }}
      >
        {/* General controls */}
        <div
         style={{
          width: "100%", // Full width
        }}
      >
        <label htmlFor="random" 
          style={{ 
            fontSize: "0.8rem",
          }}>
          Random
        </label>
        <input
          checked={blockInfo.random}
          type="checkbox"
          className=""
          id="random"
          style={{
            height: "0.8rem",
            width: "0.8rem",
           
          }}
          onClick={() => {}}
        />
        {/* Add some margin to the "Loop" label */}
        <label
          htmlFor="loop"
          style={{
            fontSize: "0.8rem",
            marginLeft: "1rem", // Add margin to the left
          }}
        >
          Loop
        </label>
        <input
          checked={blockInfo.loop}
          type="checkbox"
          className=""
          id="loop"
          style={{
            height: "0.8rem",
            width: "0.8rem",
          }}
          onClick={() => {}}
        />
          <div>
            <div style={{ fontSize: "0.8rem" }}>Speed: {blockInfo.speed}</div>
            <input
              className="slider mx-1 my-2 text-center"
              type="range"
              style={{
                width: "30%", // Full width
              }}
              onChange={() => {}}
              min={0.01}
              max={2}
              step={0.01}
              value={blockInfo.speed}
              id="speed"
            />
            <div className="text-center mx-1" style={{ fontSize: "0.8rem" }}>
              <span
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  position: "absolute",
                  left: "0.25rem", // Adjusted left position for "x0"
                }}
                onClick={() => {}}
              >
                x0
              </span>
              <span
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  position: "absolute",
                  left: "13rem", // Adjusted left position for "x1"
                }}
                onClick={() => {}}
              >
                x1
              </span>
              <span
                className=""
                onClick={() => {}}
                style={{
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  position: "absolute",
                  left: "26rem", // Adjusted right position for "x2"
                }}
              >
                x2
              </span>
            </div>
          </div>
          <button
            className="btn btn-light btn-circle m-1"
            style={{
              position: "absolute", // Set the position to absolute
              left: "1.5rem", // Position the button to the left
              top: "17rem",
              ...circleStyle,
            }}
            onClick={() => {}}
          >
            <FaPlay
              style={{
                fontSize: "12px",
                marginLeft: "-2px",
                marginTop: "-1",
              }}
            />
          </button>
        </div>

        {/* Individual players x12 */}
<div
  style={{
    display: "flex",
    flexDirection: "row", // Change to row layout
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  {[0, 1, 2, 3, 4].map((x) => {
    return (
      <div
        key={x}
        style={{
          margin: "10px", // Margin between individual players
        }}
      >
        <IndividualPlayer num={x} />
      </div>
    );
  })}
</div>

<div
  style={{
    display: "flex",
    flexDirection: "row", // Change to row layout
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  {[5, 6, 7, 8, 9].map((x) => {
    return (
      <div
        key={x}
        style={{
          margin: "10px", // Margin between individual players
        }}
      >
        <IndividualPlayer num={x} />
      </div>
    );
  })}
</div>

        {/* Master volume slider */}
<input
  className="slider text-center"
  orient="vertical"
  type="range"
  style={{
    width: "1.2rem", // Increased width
    height: "320px", // Increased height
    position: "absolute",
    left: "2rem", // Align to the right
    top: "20rem", // Adjusted top position to fit within the pink box
  }}
  onChange={() => {}}
  min={0}
  max={100}
  step={1}
  value={blockInfo.masterVolume}
  id="masterVolume"
/>

      </div>
    </React.Fragment>
  );
};
export default SamplePlayer; 