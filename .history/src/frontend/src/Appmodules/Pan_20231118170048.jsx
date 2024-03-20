import React from "react";

const Pan = ({ id, panVal, changeBlock }) => {
  return (
    <div
      style={{
        position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        backgroundColor: "rgb(17, 212, 75)" // Set the background color to green
      }}
    >
      <span
        style={{
          fontSize: "7.64rem",
          position: "absolute",
          left: "22rem",
          top: "220px"
        }}
      >
        L
      </span>
      <input
        className="slider mx-2"
        type="range"
        style={{
          width: "466px",
          position: "absolute",
          left: "30rem",
          top: "279px"
        }}
        step="0.1"
        onChange={(e) => changeBlock(id, "panVal", e.target.value)}
        min={-1}
        max={1}
        value={panVal}
        id="panVal"
      />
      <span
        style={{
          fontSize: "7.64rem",
          position: "absolute",
          left: "62rem",
          top: "220px"
        }}
      >
        R
      </span>
    </div>
  );
};

export default Pan;
