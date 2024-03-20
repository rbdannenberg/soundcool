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
          marginRight:"-15rem",
          marginLeft:"-5rem",
          marginTop:"-15rem",
          marginBottom:"0.1rem"
         
   }}
      >
       <label htmlFor="frequency" style={{fontSize: "1.5rem",}}>
          {"Frequency(hz): "}
        </label>

   <input type="text" value={parseInt(frequency)}
           readOnly 
      style={{
          width: "2.5rem",
          height: "2rem", 
          fontSize: "1rem", 
          marginLeft:"1rem", 
          marginRight:"1rem",
        
        }}//NAN的位置
        />
       </div>      
           
      {/*sliders*/}  
      <input className="slider text-center" 
       orient="horizontal"
       type="range"
        style={{
          width: "25rem",
          height: "1rem",
         marginBottom: "2rem",
         marginRight: "-2rem",
         marginTop:"2rem"

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
          marginTop:"0rem"
          }}
        >
        {modParam}
        </label>
        
        <label
          htmlFor="Not Applicable"
          style={{
          fontSize: "1.5rem",
          marginTop:"-15rem"
         
        }}
        >   
        {"Not Applicable: "}
        </label>

       <input
          className="slider"               // slider
          type="range"
          style={{
            width: "25rem",
            fontSize: "1.64rem",
            marginTop:"-5rem",
            marginLeft:"-2rem",
            marginRight:"-1rem"
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
          marginRight:"21rem",
     
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
          marginRight:"-20rem",
          marginTop:"-3rem"
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
          marginLeft:"55rem",
          marginTop:"-25rem"
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
          marginLeft:"55rem",
          marginDown:"-20rem",
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
