import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
// icons
// import blendingV from "../Components/pictures/blendingV.gif";
// import colorV from "../Components/pictures/colorV.gif";
import delay from "../Components/pictures/delay.gif";
import directinput from "../Components/pictures/directinput.gif";
// import directinputV from "../Components/pictures/directinputV.gif";
// import envelope from "../Components/pictures/envelope.gif";
// import filter from "../Components/pictures/filter.gif";
// import keyboard from "../Components/pictures/keyboard.gif";
import mixer from "../Components/pictures/mixer.gif";
import oscilloscope from "../Components/pictures/oscilloscope.gif";
import pan from "../Components/pictures/pan.gif";
// import pitch from "../Components/pictures/pitch.gif";
import player from "../Components/pictures/player.gif";
// import playerV from "../Components/pictures/playerV.gif";
// import record from "../Components/pictures/record.gif";
// import routing from "../Components/pictures/routing.gif";
import sampleplayer from "../Components/pictures/sampleplayer.gif";
// import samplerV from "../Components/pictures/samplerV.gif";
// import screenV from "../Components/pictures/screenV.gif";
// import sequencer1 from "../Components/pictures/sequencer1.gif";
import signalgen from "../Components/pictures/signalgen.gif";
import speaker from "../Components/pictures/speaker.gif";
import spectroscope from "../Components/pictures/spectroscope.gif";
// import switcherV from "../Components/pictures/switcherV.gif";
import transposer from "../Components/pictures/transposer.gif";
// import vst from "../Components/pictures/vst.gif";
// import imagesampleV from "../Components/pictures/imagesampleV.gif";
import granSynth from "../Components/pictures/granular.gif";
import { asyncAddBlock } from "../thunks.js";
import { audioDefaults } from "./blockSpecs";

const AddBlock = props => {
  return (
    <React.Fragment>
      <ReactTooltip
        style={{ width: "20px" }}
        place="right"
        type="info"
        effect="float"
        id="tool"
      />
      <div
        class="contenedor"
        id="player"
        style={{ position: "absolute", left: "0px", top: "52px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Player"))}
          data-tip="Player"
          data-for="tool"
        >
          <img alt="Player" src={player}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="sampleplayer"
        style={{ position: "absolute", left: "0px", top: "87px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("SamplePlayer"))}
          data-tip="Sampleplayer"
          data-for="tool"
        >
          <img alt="Sample Player" src={sampleplayer}></img>
        </button>
      </div>
      {/* <div
        class="keyboard"
        id="keyboard"
        style={{ position: "absolute", left: "0px", top: "230px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Keyboard"))}
        >
          <img src={keyboard}></img>
        </button>
      </div> */}

      <div
        class="contenedor"
        id="mixer"
        style={{ position: "absolute", left: "0px", top: "157px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Mixer"))}
          data-tip="Mixer"
          data-for="tool"
        >
          <img alt="Mixer" src={mixer}></img>
        </button>
      </div>
      {/* <div
        class="contenedor"
        id="routing"
        style={{ position: "absolute", left: "0px", top: "300px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Routing"))}>
          <img src={routing}></img>
        </button>
      </div> */}
      <div
        class="contenedor"
        id="delay"
        style={{ position: "absolute", left: "0px", top: "122px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Delay"))}
          data-tip="Delay"
          data-for="tool"
        >
          <img alt="Delay" src={delay}></img>
        </button>
      </div>
      <div
        class="contenedor"
        id="transposer"
        style={{ position: "absolute", left: "0px", top: "227px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Transposer"))}
          data-tip="Transposer"
          data-for="tool"
        >
          <img alt="Transposer" src={transposer}></img>
        </button>
      </div>
      {/* <div
        class="contenedor"
        id="pitch"
        style={{ position: "absolute", left: "0px", top: "297px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Pitch"))}
          data-tip="Pitch"
        >
          <img alt="Pitch" src={pitch}></img>
        </button>
      </div> */}
      <div
        class="contenedor"
        id="pan"
        style={{ position: "absolute", left: "0px", top: "192px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Pan"))}
          data-tip="Pan"
          data-for="tool"
        >
          <img alt="Pan" src={pan}></img>
        </button>
      </div>

      {/* <div
        class="contenedor"
        id="filter"
        style={{ position: "absolute", left: "0px", top: "227px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Filter"))}
          data-tip="Filter"
        >
          <img alt="Filter" src={filter}></img>
        </button>
      </div> */}
      <div
        class="contenedor"
        id="oscilloscope"
        style={{ position: "absolute", left: "50px", top: "52px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Oscilloscope"))}
          data-tip="Oscilloscope"
          data-for="tool"
        >
          <img alt="Oscilloscope" src={oscilloscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="spectroscope"
        style={{ position: "absolute", left: "50px", top: "87px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Spectroscope"))}
          data-tip="Spectroscope"
          data-for="tool"
        >
          <img alt="Spectroscope" src={spectroscope}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="signalgen"
        style={{ position: "absolute", left: "50px", top: "122px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("SignalGen"))}
          data-tip="SignalGen"
          data-for="tool"
        >
          <img alt="Signal Genrator" src={signalgen}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="granular"
        style={{ position: "absolute", left: "50px", top: "157px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("GranSynth"))}
          data-tip="GranSynth"
          data-for="tool"
        >
          <img alt="Granular Synthesis" src={granSynth}></img>
        </button>
      </div>

      {/* <div
        class="contenedor"
        id="envelope"
        style={{ position: "absolute", left: "50px", top: "300px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Envelope"))}>
          <img src={envelope}></img>
        </button>
      </div> */}

      {/* <div
        class="contenedor"
        id="sequencer"
        style={{ position: "absolute", left: "50px", top: "335px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Sequencer"))}
        >
          <img src={sequencer1}></img>
        </button>
      </div> */}

      <div
        class="contenedor"
        id="directinput"
        style={{ position: "absolute", left: "50px", top: "192px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("DirectInput", audioDefaults["DirectInput"]))}
          data-tip="DirectInput"
          data-for="tool"
        >
          <img alt="Direct Input" src={directinput}></img>
        </button>
      </div>

      <div
        class="contenedor"
        id="speaker"
        style={{ position: "absolute", left: "50px", top: "227px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Speaker"))}
          data-tip="Speaker"
          data-for="tool"
        >
          <img alt="Speaker" src={speaker}></img>
        </button>
      </div>

      {/* <div
        class="contenedor"
        id="record"
        style={{ position: "absolute", left: "50px", top: "192px" }}
      >
        <button
          name="boton"
          type="submit"
          onClick={() => props.dispatch(asyncAddBlock("Record"))}
          data-tip="Record"
          data-for="tool"

        >
          <img alt="Record" src={record}></img>
        </button>
      </div> */}
    </React.Fragment>
  );
};

export default connect()(AddBlock);
