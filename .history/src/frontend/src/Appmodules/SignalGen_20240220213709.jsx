import React from "react";

const SignalGen = ({
  id,
  frequency,
  changeBlock,
  modParam,
  modulation,
  MI,
  FD,
  waveform,
  volume,
}) => {
  const maxFrequencySlider = 1000; 
  const minFrequencySlider = 0; 

  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative",
        height: "100vh", 
        backgroundColor: "rgb(17, 206, 212)", 
      }}
    >

      {/* Frequency Display */}

      <div class="frequency display">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",

        }}
      >
       
        <label htmlFor="frequency" style={{ fontSize: "1.64rem",}}>
          {"Frequency(hz): "}
        </label>

        <input type="text" value={parseInt(frequency)}
           readOnly 
          style={{width: "5rem",height: "3rem", fontSize: "1.64rem",  }}
        />
       </div>      
           
      {/*sliders*/}  
 <input
        className="slider text-center"
        orient="horizontal"
        type="range"
        style={{
          width: "30rem",
          height: "1rem",
          transformOrigin: "top left",
        }}
      />
     </div>
     

     
      
      {/* modParam slider */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <label
          htmlFor="param"
          style={{
            fontSize: "1.64rem",
            marginBottom: "1rem",
          }}
        >
          {modParam}
        </label>
        
        <label
          htmlFor="Not Applicable"
          style={{
          fontSize: "1.64rem",
          
          }}
        >
          {"Not Applicable: "}
        </label>
      
        <input
          className="slider"               // slider
          type="range"
          style={{
            width: "30rem",
            fontSize: "1.64rem",
          }}

          onChange={(e) => {
            if (modulation === "No Mod" || modulation === "RM") {
              return;
            } else {
              changeBlock(
                id,
                modulation === "AM" ? "MI" : "FD",
                Math.floor(Math.pow(Math.E, e.target.value))
              );
            }
          }}
          min={0}
          max={modulation === "AM" ? 20 : 10}
          step={modulation === "AM" ? 0.1 : 0.01}
          value={
            modParam === "Not applicable"
              ? 0
              : modulation === "AM"
              ? MI
              : Math.log(FD)
          }
          id="param"
        />
      </div>

      {/* Waveform Dropdown */}
      <select
        value={waveform}
        onChange={(e) => changeBlock(id, "waveform", e.target.value)}
        style={{
          fontSize: "1.64rem",
          marginBottom: "1rem",
        }}
      >
        <option value="Slience">Slience</option>
        <option value="Sine Wave">Sine Wave</option>
        <option value="Square Wave">Square Wave</option>
        <option value="Sawtooth">Sawtooth</option>
        <option value="Triangle">Triangle</option>
        <option value="White Noise">White noise</option>
        <option value="Pink Noise">Pink noise</option>
      </select>

      <select
        value={modulation}
        onChange={(e) => changeBlock(id, "modulation", e.target.value)}
        style={{
          fontSize: "1.64rem",
          marginBottom: "1rem",
        }}
      >
        <option value="No Mod">No Mod</option>
        <option value="RM">RM</option>
        <option value="AM">AM</option>
        <option value="FM">FM</option>
      </select>

     

      {/* Volume Slider */}
      <div
        style={{
          fontSize: "1.64rem",
         
        }}
      >
        {"Vol: " + volume}
      </div>
      <input
        className="slider text-center"
        orient="vertical"
        type="range" 
        style={{
          width: "30rem",
          height: "10rem",
        }}
        onChange={(e) => changeBlock(id, "volume", e.target.value)}
        min={0}
        max={100}
        step={1}
        value={volume}
        id="volume"
      />
    </div>
  );
};

export default SignalGen;
