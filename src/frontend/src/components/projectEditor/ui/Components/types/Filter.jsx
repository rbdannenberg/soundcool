import React from "react";

const Filter = ({ blockInfo }) => {
  // let {} = blockInfo;
  return (
    <React.Fragment>
      <div
        className=""
        style={{
          width: "288px",
          height: "188px",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "263px",
            height: "168px",
            top: "10px",
            left: "10px",
            backgroundColor: "#DCDEE0"
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Filter;
