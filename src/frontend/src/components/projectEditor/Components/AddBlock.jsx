import React from "react";
import ReactTooltip from "react-tooltip";

// #region images
import specValues from "./blockSpecs";
import blendingV from "../Components/pictures/blendingV.gif";
import colorV from "../Components/pictures/colorV.gif";
import delay from "../Components/pictures/delay.gif";
import directinput from "../Components/pictures/directinput.gif";
import directinputV from "../Components/pictures/directinputV.gif";
import envelope from "../Components/pictures/envelope.gif";
import filter from "../Components/pictures/filter.gif";
import keyboard from "../Components/pictures/keyboard.gif";
import mixer from "../Components/pictures/mixer.gif";
import oscilloscope from "../Components/pictures/oscilloscope.gif";
import pan from "../Components/pictures/pan.gif";
import pitch from "../Components/pictures/pitch.gif";
import player from "../Components/pictures/player.gif";
import playerV from "../Components/pictures/playerV.gif";
import record from "../Components/pictures/record.gif";
import routing from "../Components/pictures/routing.gif";
import sampleplayer from "../Components/pictures/sampleplayer.gif";
import samplerV from "../Components/pictures/samplerV.gif";
import screenV from "../Components/pictures/screenV.gif";
import sequencer1 from "../Components/pictures/sequencer1.gif";
import signalgen from "../Components/pictures/signalgen.gif";
import speaker from "../Components/pictures/speaker.gif";
import spectroscope from "../Components/pictures/spectroscope.gif";
import switcherV from "../Components/pictures/switcherV.gif";
import transposer from "../Components/pictures/transposer.gif";
import vst from "../Components/pictures/vst.gif";
import imagesampleV from "../Components/pictures/imagesampleV.gif";
import granSynth from "../Components/pictures/granSynth.png";

// #endregion images

import { connect } from "react-redux";

const AddBlock = props => {
  const addBlock = typeName => {
    props.dispatch({
      type: "ADD_BLOCK",
      typeName,
      values: {
        // inNode and outNode are a list, since a block can have multiple input and output
        inNode: [],
        outNode: [],
        collapse: true,
        ...specValues[typeName]
      }
    });
  };

  return (
    <React.Fragment>
      <div
        class="contenedor"
        id="player"
        style={{ position: "absolute", left: "10px", top: "55px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Player")}>
          <img src={player}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="sampleplayer"
        style={{ position: "absolute", left: "10px", top: "90px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("SamplePlayer")}
        >
          <img src={sampleplayer}></img>
        </button>
      </div>
      <div
        class="keyboard"
        id="keyboard"
        style={{ position: "absolute", left: "10px", top: "125px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Keyboard")}>
          <img src={keyboard}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="vst"
        style={{ position: "absolute", left: "65px", top: "55px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="GranSynth"
          type="submit"
          onClick={() => addBlock("GranSynth")}
        >
          <img src={granSynth} style={{ width: "46px" }}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="mixer"
        style={{ position: "absolute", left: "10px", top: "160px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Mixer")}>
          <img src={mixer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="routing"
        style={{ position: "absolute", left: "10px", top: "195px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Routing")}>
          <img src={routing}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="delay"
        style={{ position: "absolute", left: "10px", top: "230px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Delay")}>
          <img src={delay}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="transposer"
        style={{ position: "absolute", left: "10px", top: "265px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("Transposer")}
        >
          <img src={transposer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pitch"
        style={{ position: "absolute", left: "10px", top: "300px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Pitch")}>
          <img src={pitch}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pan"
        style={{ position: "absolute", left: "10px", top: "335px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Pan")}>
          <img src={pan}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="filter"
        style={{ position: "absolute", left: "10px", top: "370px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Filter")}>
          <img src={filter}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="oscilloscope"
        style={{ position: "absolute", left: "10px", top: "405px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("Oscilloscope")}
        >
          <img src={oscilloscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="spectroscope"
        style={{ position: "absolute", left: "10px", top: "440px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("Spectroscope")}
        >
          <img src={spectroscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="envelope"
        style={{ position: "absolute", left: "10px", top: "475px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Envelope")}>
          <img src={envelope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="directinput"
        style={{ position: "absolute", left: "10px", top: "545px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("DirectInput")}
        >
          <img src={directinput}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="speaker"
        style={{ position: "absolute", left: "10px", top: "580px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Speaker")}>
          <img src={speaker}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="record"
        style={{ position: "absolute", left: "10px", top: "615px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Record")}>
          <img src={record}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="sequencer"
        style={{ position: "absolute", left: "10px", top: "510px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("Sequencer")}
        >
          <img src={sequencer1}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="SignalGen"
        style={{ position: "absolute", left: "10px", top: "650px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("SignalGen")}
        >
          <img src={signalgen}></img>
        </button>
      </div>
    </React.Fragment>
  );
};

export default connect()(AddBlock);
