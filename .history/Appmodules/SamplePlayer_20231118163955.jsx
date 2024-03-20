import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio, getAudio, youtubeAudio } from "../sounds/actions";


const circleStyle = {
  width: "3rem", 
  height: "3rem", 
  textAlign: "center",
  padding: "10px",
  fontSize: "1.2rem", 
  borderRadius: "4rem", 
  borderColor: "yellow"
};

const IndividualPlayer = ({
  id,
  num,
  file,
  inDisabled,
  audioObj,
  changeBlock
}) => {
  if(audioObj.players[num].loadPromise) {
    audioObj.players[num].loadPromise.then((res) => {
      if(res === 'missing sound') {
        file.no = true;
      }
      else {
        file.no = false;
      }
    })
  }
  // let inDisabled = true;
  const loadUrl = url => {
    audioObj.load(num, url).then(res => {
      changeBlock(id, "URLs", url, { num });
      // console.log("load called");
      if (inDisabled) changeBlock(id, "inDisableds", false, { num });
      // console.log(res);
      // console.log(inDisabled);
    });
    window.aoplayer = audioObj.players[num];
  };

  // const onSoundSelect = audio_id => {
  //   if (audioObj.players[num].isPlaying) {
  //     audioObj.stop(num);
  //   }

  //   changeBlock(id, "files", audio_id, { num });

  //   const url = serveAudio(audio_id.sound_id);

  //   loadUrl(url);
  // };

  const onSoundSelect = sound => {
    if (audioObj.players[num].isPlaying) {
      audioObj.stop(num);
    }
    let { type, sound_id } = sound;
    changeBlock(id, "files", sound, { num });

    if (type === "Sound Link") {
      getAudio(sound_id).then(res => {
        loadUrl(res["location"]);
      });
    } else if (type === "Youtube") {
      loadUrl(youtubeAudio(sound_id));
    } else {
      loadUrl(serveAudio(sound_id));
    }
  };


  return (
    <div
      style={{
        position: "relative",
        borderColor: "rgb(255, 127, 80)",
        minWidth: "100px", 
        minHeight: "220px", 
        borderWidth: "8px",
        borderStyle: "solid"
      }}
    >
      <div style={{ position: "absolute", left: "2px", fontSize: "1.0rem" }}>
        {num + 1}
      </div>
      <button
        className="btn btn-light m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "8px",
          left: "0.25rem"
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
          top: "70px",
          left: "0.25rem"
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
          webkitTransform: "scale(0.8)"
        }}
      >
       
      </div>
    </div>
  );
};

const SamplePlayer = () => {
 
  const blockInfo = {
    id: 1, // Dummy ID
    speed: 1, // Dummy speed value
    random: false, // Dummy random value
    loop: false, // Dummy loop value
    masterVolume: 50 // Dummy masterVolume value
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
          backgroundColor: "rgb(	255, 182, 193)",
          minHeight: "100vh" 
        }}
      >
       
        <div
          style={{
            width: "100%" 
          }}
        >
          <label
            htmlFor="random"
            style={{
              fontSize: "1.7rem",
              marginLeft: "10rem" // Adjust the left margin as needed
            }}
          >
            Random
          </label>
          <input
            checked={blockInfo.random}
            type="checkbox"
            className=""
            id="random"
            style={{
              height: "1.9em",
              width: "1.9rem"
            }}
            onClick={() => {}}
          />
          {/* Add some margin to the "Loop" label */}
          <label
            htmlFor="loop"
            style={{
              fontSize: "1.7rem",
              marginLeft: "10rem" // Add margin to the left
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
              height: "1.8rem",
              width: "1.8rem"
            }}
            onClick={() => {}}
          />
          <div>
            <div style={{ fontSize: "1.8rem", marginLeft: "10rem" }}>
              Speed: {blockInfo.speed}
            </div>
            <input
              className="slider mx-1 my-2 text-center"
              type="range"
              style={{
                width: "70%",                 // Full width
                marginLeft: "7rem" // Adjust the left margin as needed
              }}
              onChange={() => {}}
              min={0.01}
              max={2}
              step={0.01}
              value={blockInfo.speed}
              id="speed"
            />

            <div className="text-center mx-1" style={{ fontSize: "1.8rem" }}>
              <span
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "1.8rem",
                  position: "absolute",
                  left: "9rem" // Adjust the left position as needed to move it to the right
                }}
                onClick={() => {}}
              >
                x0
              </span>

              <span
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "1.8rem",
                  position: "absolute",
                  left: "36rem" // Adjusted left position for "x1"
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
                  fontSize: "1.8rem",
                  position: "absolute",
                  left: "50rem" // Adjusted right position for "x2"
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
              left: "5rem", // Position the button to the left
              top: "26rem",
              ...circleStyle
            }}
            onClick={() => {}}
          >
            <FaPlay
              style={{
                fontSize: "12px",
                marginLeft: "1px",
                marginTop: "-4"
              }}
            />
            {/* Text below the button */}
            <p style={{ position: "absolute", left: "-1rem", top: "2rem" }}>
              Reverse
            </p>
          </button>
        </div>

        {/* Individual players x12 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Change to row layout
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {[0, 1, 2, 3, 4].map((x) => {
            return (
              <div
                key={x}
                style={{
                  margin: "60px" // Margin between individual players
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
            justifyContent: "center"
          }}
        >
          {[5, 6, 7, 8, 9].map((x) => {
            return (
              <div
                key={x}
                style={{
                  margin: "60px" // Margin between individual players
                }}
              >
                <IndividualPlayer num={x} />
              </div>
            );
          })}
        </div>

        <div>
          {/* Master volume slider */}
          <input
            className="slider text-center"
            orient="vertical"
            type="range"
            style={{
              width: "30rem",
              height: "320px", 
              transform: "rotate(270deg) translateX(100%)", 
              transformOrigin: "right", 
              position: "absolute", 
              right: "5rem", 
            }}
            onChange={() => {}}
            min={0}
            max={100}
            step={1}
            value={blockInfo.masterVolume}
            id="masterVolume"
          />
          {/* Text below the slider */}
          <p
            style={{
              position: "absolute",
              right: "3.5rem",
              top: "40rem",
              fontSize: "1.5rem"
            }}
          >
            volume
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SamplePlayer;
