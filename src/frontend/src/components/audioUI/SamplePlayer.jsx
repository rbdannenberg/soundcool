import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare, FaPause } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio, getAudio, youtubeAudio } from "../sounds/actions";

const circleStyle = {
  width: "1.2rem",
  height: "1.2rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "8px",
  borderRadius: "0.8rem",
  borderColor: "black"
};

// id is the id of the module, num is the index of the samples
// num starts with 0.
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
        position: "absolute",
        borderColor: "white",
        width: "35px",
        height: "84px",
        borderWidth: "1px",
        borderStyle: "solid"
      }}
    >
      <div style={{ position: "absolute", left: "2px", fontSize: "0.8rem" }}>
        {num + 1}
      </div>
      <button
        disabled={inDisabled}
        className="btn btn-light m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "8px",
          left: "0.25rem"
        }}
        onClick={() => {
          // console.log("playbutton" + num);
          audioObj.players[num].isPlaying
            ? audioObj.pause(num)
            : audioObj.play(num);
          changeBlock(id, "playings", undefined, { num });
        }}
      >
        {!audioObj.players[num].isPlaying && (
          <FaPlay style={{ fontSize: "12px", marginLeft: "2.5px" }} />
        )}
        {audioObj.players[num].isPlaying && (
          <FaPause style={{ fontSize: "12px", marginLeft: "2.5px" }} />
        )}
      </button>
      <button
        disabled={inDisabled}
        className="btn btn-light btn-circle m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "34px",
          left: "0.25rem"
        }}
        onClick={() => {
          // console.log("i am playing: " + num + audioObj.players[num].isPlaying);
          audioObj.stop(num);
          // console.log("i am playing: " + num + audioObj.players[num].isPlaying);
          changeBlock(id, "playings", undefined, { num });
        }}
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
        <AddSound minimal={true} onSoundSelect={onSoundSelect} file={file} />
      </div>
    </div>
  );
};

const SamplePlayer = ({ blockInfo, changeBlock }) => {
  let l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let {
    id,
    speed,
    files,
    inDisableds,
    masterVolume,
    loop,
    random,
    audioObj,
    URLs
  } = blockInfo;

  return (
    <React.Fragment>
      <div
        className=""
        style={{
          height: "13.9rem",
          position: "relative"
        }}
      >
        {/* general controls */}
        <div
          style={{
            position: "absolute",
            top: "-1px"
          }}
        >
          <label
            htmlFor="random"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "0.0625rem",
              top: "4px"
            }}
          >
            Random
          </label>
          <input
            checked={random}
            type="checkbox"
            className=""
            id="random"
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "17px",
              height: "0.8rem",
              width: "0.8rem"
            }}
            onClick={() => changeBlock(id, "random", undefined)}
          />
          <label
            htmlFor="loop"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "2.75rem",
              top: "4px"
            }}
          >
            Loop
          </label>
          <input
            checked={loop}
            type="checkbox"
            className=""
            id="loop"
            style={{
              position: "absolute",
              left: "2.9375rem",
              top: "17px",
              height: "0.8rem",
              width: "0.8rem"
            }}
            onClick={() => changeBlock(id, "loop", undefined)}
          />

          <div style={{ position: "absolute", left: "4.0625rem" }}>
            <div
              style={{
                fontSize: "0.64rem",
                position: "absolute",
                left: "0.625rem",
                width: "80px"
              }}
            >
              Speed: {speed}
            </div>
            <input
              className="slider mx-1 my-2 text-center"
              type="range"
              style={{
                width: "6.5625rem",
                position: "absolute",
                left: "5px",
                top: "0.125rem"
              }}
              onChange={e => changeBlock(id, "speed", e.target.value)}
              min={0.01}
              max={2}
              step={0.01}
              value={speed}
              id="speed"
            />
            <div
              className="text-center mx-1"
              style={{
                fontSize: "0.8rem",
                position: "absolute",
                top: "23px"
              }}
            >
              <span
                className=""
                style={{
                  position: "absolute",
                  left: "5px",
                  cursor: "pointer",
                  fontSize: "0.64rem",
                  top: "0.25rem"
                }}
                onClick={e => changeBlock(id, "speed", 0.01)}
              >
                x0
              </span>
              <span
                className=""
                style={{
                  position: "absolute",
                  left: "3.25rem",
                  cursor: "pointer",
                  fontSize: "0.64rem",
                  top: "0.25rem"
                }}
                onClick={e => changeBlock(id, "speed", 1)}
              >
                x1
              </span>
              <span
                className=""
                onClick={e => changeBlock(id, "speed", 2)}
                style={{
                  position: "absolute",
                  left: "6.0625rem",
                  cursor: "pointer",
                  fontSize: "0.64rem",
                  top: "0.25rem"
                }}
              >
                x2
              </span>
            </div>
          </div>

          <button
            className="btn btn-light btn-circle m-1"
            style={{
              ...circleStyle,
              position: "absolute",
              left: "11.25rem",
              top: "0.25rem"
            }}
            onClick={() => changeBlock(id, "reversed", undefined)}
          >
            <FaPlay
              style={{
                fontSize: "12px",
                marginLeft: "-2px",
                marginTop: "-1px",
                transform: "scaleX(-1)"
              }}
            />
          </button>
        </div>

        {/* individual players x12 */}
        {l.map(x => {
          let top = Math.floor(x / 5) * 84 + 45 + "px";
          let left = (x % 5) * 35 + 2 + "px"; //12
          return (
            <div
              key={x}
              style={{
                position: "absolute",
                top: top,
                left: left
              }}
            >
              <IndividualPlayer
                id={id}
                num={x}
                file={files[x]}
                inDisabled={inDisableds[x]}
                audioObj={audioObj}
                changeBlock={changeBlock}
              />
            </div>
          );
        })}

        {/* mastervolume slider */}
        <input
          className="slider text-center"
          orient="vertical"
          type="range"
          style={{
            width: "1.2rem",
            height: "170px",
            position: "absolute",
            left: "11.5rem",
            top: "2.5rem"
          }}
          onChange={e => changeBlock(id, "masterVolume", e.target.value)}
          min={0}
          max={100}
          step={1}
          value={masterVolume}
          id="masterVolume"
        />
      </div>

      {/* footer */}
      <div
        className="text-center"
        style={{ backgroundColor: "grey", height: "24px" }}
      >
        {!blockInfo.oscPort ? (
          <div>
            <label
              htmlFor="osc"
              style={{ fontSize: "0.64rem", marginBottom: "0" }}
            >
              OSC
            </label>
            <input
              type="checkbox"
              className="m-1"
              id="osc"
              onClick={() => changeBlock(id, "osc", undefined)}
            />
            <span className="col text-center">
              <label
                htmlFor="oscPort"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                OSC port:
              </label>
              <input
                type="text"
                className=""
                style={{
                  height: "1.2rem",
                  width: "2.4rem",
                  fontSize: "0.64rem"
                }}
                id="oscPort"
                onChange={e => changeBlock(id, "oscPort", e.target.value)}
              />
            </span>
          </div>
        ) : (
          <div>
            <span className="col text-center">
              <label
                htmlFor="oscPort"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                {"osc port: " + blockInfo.oscPort}
              </label>
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, { changeBlock })(SamplePlayer);
