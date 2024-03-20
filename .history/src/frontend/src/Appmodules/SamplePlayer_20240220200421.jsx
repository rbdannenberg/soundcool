import React from "react";
import { FaPlay, FaSquare } from "react-icons/fa";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "1rem",
  borderRadius: "1rem",
  borderColor: "black",
};

const IndividualPlayer = ({ num }) => {
  return (
    <div style={{
        borderColor: "white",
        minWidth: "2rem",
        minHeight: "2rem",
        borderWidth: "0.1rem",
        borderStyle: "solid",
        display: 'fixed',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <span style={{ fontSize: "0.8rem" }}>{num + 1}</span>
      <button
        className="btn btn-light m-1"
        style={{ ...circleStyle }}
        onClick={() => {}}
      >
        <FaPlay style={{ fontSize: "1rem" }} />
      </button>
      <button
        className="btn btn-light m-1"
        style={{ ...circleStyle }}
        onClick={() => {}}
      >
        <FaSquare style={{ fontSize: "1rem" }} />
      </button>
     
    </div>
  );
};

const SamplePlayer = () => {
  const blockInfo = {
    id: 1,
    speed: 1.0,
    random: false,
    loop: false,
    masterVolume: 50,
  };

  return (
    <React.Fragment>
      <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "pink",
          minHeight: "100vh"
        }}
      >
         {/* General controls - Random and Loop Checkboxes */}
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}> {/* Reduced right margin */}
            <label htmlFor="random" style={{ fontSize: "1.8rem" }}>Random</label>
            <input
              checked={blockInfo.random}
              type="checkbox"
              id="random"
              style={{ height: "0.8rem"}}
              onClick={() => {}}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}> {/* Reduced left margin */}
            <label htmlFor="loop" style={{ fontSize: "1.8rem" }}>Loop</label>
            <input
              checked={blockInfo.loop}
              type="checkbox"
              id="loop"
              style={{ height: "0.8rem" }}
              onClick={() => {}}
            />
            <button
            className="btn btn-light btn-circle m-1"
            style={circleStyle}
            onClick={() => {}}
          >
            <FaPlay style={{ fontSize: "12px"}} />
            <p style={{ position: "relative", top: "-2rem",left:"3rem",fontSize: "1.8rem" }}>Reverse</p>
            
          </button>
          </div>
        </div>


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: "1.8rem" }}>Speed: {blockInfo.speed}</span>
          <input
            className="slider mx-1"
            type="range"
            style={{ width: "40%" }}
            onChange={() => {}}
            min={0.01}
            max={2}
            step={0.01}
            value={blockInfo.speed}
            id="speed"
          />
        </div>

      
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', margin: '1rem ' }}>
          <span className="" style={{ cursor: "pointer", fontSize: "1.6rem", marginLeft: '5rem' }} onClick={() => {}}>x0</span>
          <span className="" style={{ cursor: "pointer", fontSize: "1.6rem" , marginLeft: '-40rem'}} onClick={() => {}}>x1</span>
          <span className="" style={{ cursor: "pointer", fontSize: "1.6rem" , marginLeft: '-40rem'}} onClick={() => {}}>x2</span>
        </div>

       

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: "1.8rem" }}>Volume: {blockInfo.volume}</span>
          <input
            className="slider my-2"
            type="range"
            style={{ width: "40%" }}
            onChange={() => {}}
            min={0.01}
            max={2}
            step={0.01}
            value={blockInfo.volume}
            id="volume"
          />
        </div>

        

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "3rem" }}>
          {[...Array(10).keys()].map(num => <IndividualPlayer key={num} num={num} />)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SamplePlayer;
