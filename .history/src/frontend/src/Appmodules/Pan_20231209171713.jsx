import React from "react";

const Pan = ({ id, panVal, changeBlock }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // Vertically center the items
        justifyContent: "center", // Horizontally center the items
        height: "100vh", // Full viewport height
        backgroundColor: "rgb(17, 212, 75)" // Set the background color to green
      }}
    >
      <span style={{ fontSize: "7.64rem", marginRight: "20px" }}>L</span>
      
      <input
        className="slider mx-2"
        type="range"
        style={{ width: "466px" }}
        step="0.1"
        onChange={(e) => changeBlock(id, "panVal", e.target.value)}
        min={-1}
        max={1}
        value={panVal}
        id="panVal"
      />
      
      <span style={{ fontSize: "7.64rem", marginLeft: "20px" }}>R</span>
    </div>
  );
};

export default Pan;
