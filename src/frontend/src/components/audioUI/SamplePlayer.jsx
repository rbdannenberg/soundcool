import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";
import { FaPlay, FaSquare } from "react-icons/fa";
import AddSound from "../addSound";
import { serveAudio } from "../sounds/actions";

const circleStyle = {
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  padding: "0px",
  fontSize: "10px",
  borderRadius: "1rem",
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
  // let inDisabled = true;
  const loadUrl = url => {
    audioObj.load(num, url).then(res => {
      console.log("load called");
      if (inDisabled) changeBlock(id, "inDisableds", false, { num });
      console.log(res);
      console.log(inDisabled);
    });
    window.aoplayer = audioObj.players[num];
  };

  // if (file) {
  //   const url = serveAudio(file.sound_id);
  //   loadUrl(url);
  //   // inDisabled = false;
  //   //use changeblock
  //   // store.dispatch({
  //   //   type: "CHANGE_BLOCK",
  //   //   id,
  //   //   field: "inDisableds",
  //   //   num,
  //   //   value: false
  //   // });
  // }

  const onSoundSelect = audio_id => {
    if (audioObj.players[num].isPlaying) {
      audioObj.stop(num);
    }

    changeBlock(id, "files", audio_id, { num });

    const url = serveAudio(audio_id.sound_id);

    //use changeblock
    // store.dispatch({
    //   type: "CHANGE_BLOCK",
    //   id,
    //   field: "inDisableds",
    //   num,
    //   value: false
    // });
    loadUrl(url);
  };

  return (
    <div
      style={{
        position: "absolute",
        borderColor: "white",
        width: "70px",
        height: "75px",
        borderWidth: "1px",
        borderStyle: "solid"
      }}
    >
      <div style={{ position: "absolute", left: "2px" }}>{num + 1}</div>
      <button
        disabled={inDisabled}
        className="btn btn-light m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "10px",
          left: "5px"
        }}
        onClick={() => {
          console.log("playbutton" + num);
          audioObj.players[num].isPlaying
            ? audioObj.pause(num)
            : audioObj.play(num);
          changeBlock(id, "playings", undefined, { num });
        }}
      >
        <FaPlay style={{ fontSize: "12px", marginLeft: "2.5px" }} />
      </button>
      <button
        disabled={inDisabled}
        className="btn btn-light btn-circle m-1"
        style={{
          ...circleStyle,
          position: "absolute",
          top: "10px",
          left: "31px"
        }}
        onClick={() => {
          console.log("i am playing: " + num + audioObj.players[num].isPlaying);
          audioObj.stop(num);
          console.log("i am playing: " + num + audioObj.players[num].isPlaying);
          changeBlock(id, "playings", undefined, { num });
        }}
      >
        <FaSquare style={{ fontSize: "12px" }} />
      </button>

      <div
        style={{
          position: "absolute",
          top: "38px",
          left: "4px",
          webkitTransform: "scale(0.8)"
        }}
      >
        <AddSound minimal={true} onSoundSelect={onSoundSelect} file={file} />
      </div>

      {/* <div
        className="dropdown"
        style={{
          position: "absolute",
          top: "40px",
          left: "5px"
        }}
      >
        <button
          className="btn-sm btn-light dropdown-toggle"
          style={{
            fontSize: "0.8rem",
            padding: "0px",
            width: "55px",
            height: "25px"
          }}
          id="file dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {file}
        </button>
        <div
          className="dropdown-menu"
          style={{ fontSize: "0.8rem" }}
          aria-labelledby="file dropdown"
        >
        </div>
      </div> */}
    </div>
  );
};

const SamplePlayer = ({ blockInfo, changeBlock }) => {
  let l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let { id, speed, files, inDisableds, masterVolume, audioObj } = blockInfo;

  return (
    <React.Fragment>
      <div
        className=""
        style={{
          width: "288px",
          height: "290px",
          position: "relative"
        }}
      >
        {/* general controls */}
        <div
          style={{
            position: "absolute",
            top: "2px"
          }}
        >
          <label
            htmlFor="random"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "3px",
              top: "4px"
            }}
          >
            Random
          </label>
          <input
            type="checkbox"
            className=""
            id="random"
            style={{
              position: "absolute",
              left: "50px",
              top: "5px",
              height: "20px",
              width: "20px"
            }}
            onClick={() => changeBlock(id, "random", undefined)}
          />
          <label
            htmlFor="loop"
            style={{
              fontSize: "0.8rem",
              position: "absolute",
              left: "70px",
              top: "4px"
            }}
          >
            Loop
          </label>
          <input
            type="checkbox"
            className=""
            id="loop"
            style={{
              position: "absolute",
              left: "100px",
              top: "5px",
              height: "20px",
              width: "20px"
            }}
            onClick={() => changeBlock(id, "loop", undefined)}
          />

          <div style={{ position: "absolute", left: "115px" }}>
            <div
              style={{
                fontSize: "0.8rem",
                position: "absolute",
                left: "10px"
              }}
            >
              Speed
            </div>
            <input
              className="slider mx-1 my-2 text-center"
              type="range"
              style={{
                width: "150px",
                position: "absolute",
                left: "5px",
                top: "6px"
              }}
              onChange={e => changeBlock(id, "speed", e.target.value)}
              min={0}
              max={2}
              step={0.1}
              value={speed}
              id="speed"
            />
            <div
              className="text-center mx-1"
              style={{
                fontSize: "0.8rem",
                position: "absolute",
                top: "28px"
              }}
            >
              <span className="" style={{ position: "absolute", left: "5px" }}>
                x0
              </span>
              <span className="" style={{ position: "absolute", left: "72px" }}>
                x1
              </span>
              <span
                className=""
                style={{ position: "absolute", left: "140px" }}
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
              left: "275px"
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
          let top = Math.floor(x / 4) * 75 + 50 + "px";
          let left = (x % 4) * 70 + 5 + "px";
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
            width: "1.5rem",
            height: "220px",
            position: "absolute",
            left: "288px",
            top: "50px"
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
        style={{ backgroundColor: "grey", height: "30px" }}
      >
        <span className="col text-center">
          <label htmlFor="kinect" style={{ fontSize: "0.8rem" }}>
            Kinect
          </label>
          <input
            type="checkbox"
            className="m-1"
            id="kinect"
            onClick={() => changeBlock(id, "kinetic", undefined)}
          />
        </span>
        <span className="col text-center">
          <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
            OSC port:
          </label>
          <input
            type="text"
            className="my-1"
            style={{ height: "1.5rem", width: "3rem" }}
            id="osc"
            onChange={e => changeBlock(id, "osc", e.target.value)}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(
  mapStateToProps,
  { changeBlock }
)(SamplePlayer);
