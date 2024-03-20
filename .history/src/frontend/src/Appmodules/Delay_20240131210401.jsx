import React, { useState } from "react";

const Delay = ({ changeBlock }) => {
  const [delayTime, setDelayTime] = useState(1000);
  const [maxDelayTime, setMaxDelayTime] = useState(1000);
  const [delayFeedback, setDelayFeedback] = useState(0.5);

  const handleBlockChange = (key, value) => {
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
        backgroundColor: "rgb(212, 177, 0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        {/* Delay and Max */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: "1rem" }}>
          <label
            style={{
              fontSize: "1.64rem",
            }}
            data-tip="the amount of delay in ms: range [1, maxDelay]"
          >
            delay(ms):
          </label>
          <label
            style={{
              fontSize: "1.64rem",
            }}
            data-tip="max delay in ms: range [1, 60000]"
          >
            max:
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "1rem" }}>
          <input
            className="form-control"
            placeholder="delay"
            value={delayTime}
            onChange={(e) => handleBlockChange("delayTime", e.target.value)}
            style={{
              width: "5rem",
              height: "26px",
              fontSize: "1.64rem",
            
            }}
          />
          <input
            className="form-control"
            placeholder="1000"
            onChange={(e) => handleBlockChange("maxDelayTime", e.target.value)}
            style={{
              width: "4.1875rem",
              height: "28px",
              fontSize: "1.64rem",
             
            }}
          />
        </div>
        {/* Slider_1 */}
        <input
          className="slider"
          type="range"
          style={{
            width: "30.5rem",
          }}
          onChange={(e) => handleBlockChange("delayTime", e.target.value)}
          min={0}
          max={maxDelayTime}
          value={delayTime}
          id="delayTime"
        />
      </div>

      {/* Feedback and Slider_2 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: "1rem" }}>
          <label
            style={{
              fontSize: "1.64rem",
            }}
            data-tip="Feedback: range [0, 1]"
          >
            feedback:
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "1rem" }}>
          <input
            className="form-control"
            placeholder="feedback"
            value={delayFeedback}
            style={{
              width: "3rem",
              height: "23px",
              fontSize: "1.64rem",
              padding: "0.0rem",
            }}
            onChange={(e) => handleBlockChange("delayFeedback", e.target.value)}
          />
        </div>
        {/* Slider_2 */}
        <input
          className="slider"
          type="range"
          style={{
            width: "31rem",
          }}
          onChange={(e) => handleBlockChange("delayFeedback", e.target.value)}
          step={0.001}
          min={0}
          max={1}
          value={delayFeedback}
          id="feedback"
        />
      </div>
    </div>
  );
};

export default Delay;
