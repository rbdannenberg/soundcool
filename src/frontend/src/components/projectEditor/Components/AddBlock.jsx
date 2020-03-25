import React from "react";
// #region images
import specValues from "./blockSpecs";
import blendingV from "../pictures/blendingV.gif";
import colorV from "../pictures/colorV.gif";
import delay from "../pictures/delay.gif";
import directinput from "../pictures/directinput.gif";
import directinputV from "../pictures/directinputV.gif";
import envelope from "../pictures/envelope.gif";
import filter from "../pictures/filter.gif";
import keyboard from "../pictures/keyboard.gif";
import mixer from "../pictures/mixer.gif";
import oscilloscope from "../pictures/oscilloscope.gif";
import pan from "../pictures/pan.gif";
import pitch from "../pictures/pitch.gif";
import player from "../pictures/player.gif";
import playerV from "../pictures/playerV.gif";
import record from "../pictures/record.gif";
import routing from "../pictures/routing.gif";
import sampleplayer from "../pictures/sampleplayer.gif";
import samplerV from "../pictures/samplerV.gif";
import screenV from "../pictures/screenV.gif";
import sequencer from "../pictures/sequencer.gif";
import signalgen from "../pictures/signalgen.gif";
import speaker from "../pictures/speaker.gif";
import spectroscope from "../pictures/spectroscope.gif";
import switcherV from "../pictures/switcherV.gif";
import transposer from "../pictures/transposer.gif";
import vst from "../pictures/vst.gif";
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
        style={{ position: "absolute", left: "80px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Player")}>
          <img src={player}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="sampleplayer"
        style={{ position: "absolute", left: "150px", top: "70px" }}
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
        class="mixer"
        id="sampleplayer"
        style={{ position: "absolute", left: "220px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Mixer")}>
          <img src={mixer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="transposer"
        style={{ position: "absolute", left: "290px", top: "70px" }}
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
        id="oscilloscope"
        style={{ position: "absolute", left: "370px", top: "70px" }}
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
        style={{ position: "absolute", left: "430px", top: "70px" }}
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
        id="signalgen"
        style={{ position: "absolute", left: "500px", top: "70px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("SignalGen")}
        >
          <img src={signalgen}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="delay"
        style={{ position: "absolute", left: "570px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Delay")}>
          <img src={delay}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="keyboard"
        style={{ position: "absolute", left: "640px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Keyboard")}>
          <img src={keyboard}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pan"
        style={{ position: "absolute", left: "710px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Pan")}>
          <img src={pan}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="routing"
        style={{ position: "absolute", left: "780px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Routing")}>
          <img src={routing}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="envelope"
        style={{ position: "absolute", left: "850px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Envelope")}>
          <img src={envelope}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="sequencer"
        style={{ position: "absolute", left: "920px", top: "70px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("Sequencer")}
        >
          <img src={sequencer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="vst"
        style={{ position: "absolute", left: "990px", top: "70px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => addBlock("GranSynth")}
        >
          <img src={vst}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pitch"
        style={{ position: "absolute", left: "1060px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Pitch")}>
          <img src={pitch}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="filter"
        style={{ position: "absolute", left: "1130px", top: "70px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Filter")}>
          <img src={filter}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="directinput"
        style={{ position: "absolute", right: "10px", top: "180px" }}
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
        id="directinputV"
        style={{ position: "absolute", right: "10px", top: "250px" }}
      >
        <button name="boton" type="submit">
          <img src={directinputV}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="speaker"
        style={{ position: "absolute", right: "10px", top: "320px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Speaker")}>
          <img src={speaker}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="screenV"
        style={{ position: "absolute", right: "10px", top: "390px" }}
      >
        <button name="boton" type="submit">
          <img src={screenV}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="record"
        style={{ position: "absolute", right: "10px", top: "460px" }}
      >
        <button name="boton" type="submit" onClick={() => addBlock("Record")}>
          <img src={record}></img>
        </button>
      </div>
    </React.Fragment>
  );
};

export default connect()(AddBlock);
