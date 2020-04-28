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
import sequencer from "../Components/pictures/sequencer.gif";
import signalgen from "../Components/pictures/signalgen.gif";
import speaker from "../Components/pictures/speaker.gif";
import spectroscope from "../Components/pictures/spectroscope.gif";
import switcherV from "../Components/pictures/switcherV.gif";
import transposer from "../Components/pictures/transposer.gif";
import vst from "../Components/pictures/vst.gif";
import imagesampleV from "../Components/pictures/imagesampleV.gif";

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
        style={{ position: "absolute", left: "240px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="Player"
          type="submit"
          onClick={() => addBlock("Player")}
        >
          <img src={player}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="sampleplayer"
        style={{ position: "absolute", left: "305px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="SamplePlayer"
          onClick={() => addBlock("SamplePlayer")}
        >
          <img src={sampleplayer}></img>
        </button>
      </div>
      <div
        class="keyboard"
        id="keyboard"
        style={{ position: "absolute", left: "370px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="keyboard"
          type="submit"
          onClick={() => addBlock("Keyboard")}
        >
          <img src={keyboard}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="vst"
        style={{ position: "absolute", left: "435px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="GranSynth"
          type="submit"
          onClick={() => addBlock("GranSynth")}
        >
          <img src={vst}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="mixer"
        style={{ position: "absolute", left: "500px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="mixer"
          type="submit"
          onClick={() => addBlock("Mixer")}
        >
          <img src={mixer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="routing"
        style={{ position: "absolute", left: "565px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="routing"
          type="submit"
          onClick={() => addBlock("Routing")}
        >
          <img src={routing}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="delay"
        style={{ position: "absolute", left: "630px", top: "54px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="delay"
          type="submit"
          onClick={() => addBlock("Delay")}
        >
          <img src={delay}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="transposer"
        style={{ position: "absolute", left: "695px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="transposer"
          onClick={() => addBlock("Transposer")}
        >
          <img src={transposer}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pitch"
        style={{ position: "absolute", left: "760px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="pitch"
          type="submit"
          onClick={() => addBlock("Pitch")}
        >
          <img src={pitch}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="pan"
        style={{ position: "absolute", left: "825px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="pan"
          type="submit"
          onClick={() => addBlock("Pan")}
        >
          <img src={pan}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="filter"
        style={{ position: "absolute", left: "890px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          data-tip="filter"
          type="submit"
          onClick={() => addBlock("Filter")}
        >
          <img src={filter}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="oscilloscope"
        style={{ position: "absolute", left: "955px", top: "53px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="Oscilloscope"
          onClick={() => addBlock("Oscilloscope")}
        >
          <img src={oscilloscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="playerV"
        style={{ position: "absolute", left: "10px", top: "110px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*playerV" type="submit">
          <img src={playerV}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="directinput"
        style={{ position: "absolute", right: "10px", top: "150px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="DirectInput"
          onClick={() => addBlock("DirectInput")}
        >
          <img src={directinput}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="directinputV"
        style={{ position: "absolute", right: "10px", top: "205px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*directinputV" type="submit">
          <img src={directinputV}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="speaker"
        style={{ position: "absolute", right: "10px", top: "260px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="speaker"
          onClick={() => addBlock("Speaker")}
        >
          <img src={speaker}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="screenV"
        style={{ position: "absolute", right: "10px", top: "315px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*screenV" type="submit">
          <img src={screenV}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="record"
        style={{ position: "absolute", right: "10px", top: "370px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="record"
          onClick={() => addBlock("Record")}
        >
          <img src={record}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="SignalGen"
        style={{ position: "absolute", right: "10px", top: "425px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="SignalGen"
          onClick={() => addBlock("SignalGen")}
        >
          <img src={signalgen}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="sequencer"
        style={{ position: "absolute", right: "10px", top: "480px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="sequencer"
          onClick={() => addBlock("Sequencer")}
        >
          <img src={sequencer}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="spectroscope"
        style={{ position: "absolute", right: "10px", top: "535px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button
          name="boton"
          type="submit"
          data-tip="spectroscope"
          onClick={() => addBlock("Spectroscope")}
        >
          <img src={spectroscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="samplerV"
        style={{ position: "absolute", left: "10px", top: "165px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*samplerV" type="submit">
          <img src={samplerV}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="switcherV"
        style={{ position: "absolute", left: "10px", top: "385px" }}
      >
        <button name="boton" data-tip="*switcherV" type="submit">
          <img src={switcherV}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="blendingV"
        style={{ position: "absolute", left: "10px", top: "330px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*blendingV" type="submit">
          <img src={blendingV}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="colorV"
        style={{ position: "absolute", left: "10px", top: "275px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*colorV" type="submit">
          <img src={colorV}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="imagesampleV"
        style={{ position: "absolute", left: "10px", top: "220px" }}
      >
        <ReactTooltip place="top" type="info" effect="float" />
        <button name="boton" data-tip="*imagesampleV" type="submit">
          <img src={imagesampleV}></img>
        </button>
      </div>
    </React.Fragment>
  );
};

export default connect()(AddBlock);
