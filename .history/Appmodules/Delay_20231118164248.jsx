import React, { useState } from "react"; // Import useState to manage state

const Delay = ({ changeBlock }) => {
  // Initialize state variables for delayTime, maxDelayTime, and delayFeedback
  const [delayTime, setDelayTime] = useState(1000);
  const [maxDelayTime, setMaxDelayTime] = useState(1000);
  const [delayFeedback, setDelayFeedback] = useState(0.5);

  // Handle changeBlock function
  const handleBlockChange = (key, value) => {
    // Update the state based on the key
    switch (key) {
      case "delayTime":
        setDelayTime(value);
        break;
      case "maxDelayTime":
        setMaxDelayTime(value);
        break;
      case "delayFeedback":
        setDelayFeedback(value);
        break;
      default:
        break;
    }
    // Call the changeBlock function with the updated values
    changeBlock(key, value);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(212, 177, 0)", // Set the background color to green
      }}
    >
      {/* Delay Time */}
      <input
        className="slider"         //delay time 
        type="range"
        style={{
          width: "30.5rem",
          position: "absolute",
          top: "200.375px",
          left: "336px",
        }}
        onChange={(e) => handleBlockChange("delayTime", e.target.value)}
        min={0}
        max={maxDelayTime}
        value={delayTime}
        id="delayTime"
      />
      <div className="form-group">
        <label                          //delay(ms)
          style={{
            fontSize: "1.64rem",
            position: "absolute",
            top: "12.0625rem",
            left: "53rem",
          }}
          data-tip="the amount of delay in ms: range [1, maxDelay]"
        >
          delay(ms):
        </label>

        <input
          className="form-control"       
          placeholder="delay"
          value={delayTime}
          onChange={(e) => handleBlockChange("delayTime", e.target.value)}
          style={{
            position: "absolute",
            width: "5rem",
            height: "26px",
            left: "62rem",
            top: "190px",
            fontSize: "1.64rem",
            padding: "0.0rem",
          }}
        />
        <label
          style={{                           //max:
            fontSize: "1.64rem",
            position: "absolute",
            top: "12rem",
            left: "68rem",
          }}
          data-tip="max delay in ms: range [1, 60000]"
        >
          max: 
        </label>
        <input                                       //max:1000
          className="form-control"
          placeholder="1000"
          onChange={(e) => handleBlockChange("maxDelayTime", e.target.value)}
          style={{
            position: "absolute",
            width: "4.1875rem",
            height: "28px",
            left: "71.6rem",
            top: "190px",
            fontSize: "1.64rem",
            padding: "0.0rem",
          }}
        />
      </div>

      {/* Feedback */}
      <input                               //feedback slider
        className="slider"
        type="range"
        style={{
          width: "31rem",
          position: "absolute",
          top: "333px",
          left: "330px",
        }}
        onChange={(e) => handleBlockChange("delayFeedback", e.target.value)}
        step={0.001}
        min={0}
        max={1}
        value={delayFeedback}
        id="feedback"
      />
      <div className="form-group">            
        <label
          style={{                        //feedback:
            fontSize: "1.64rem",
            position: "absolute",
            top: "20rem",
            left: "53rem",
          }}
          data-tip="Feedback: range [0, 1]"
        >
          feedback:
        </label>
        <input
          className="form-control"
          placeholder="feedback"
          value={delayFeedback}
          style={{
            position: "absolute",
            width: "3rem",
            height: "23px",
            left: "61rem",
            top: "20.4rem",
            fontSize: "1.64rem",
            padding: "0.0rem",
          }}
          onChange={(e) => handleBlockChange("delayFeedback", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Delay;
