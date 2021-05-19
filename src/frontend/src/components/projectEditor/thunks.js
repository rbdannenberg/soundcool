import scContext from "../../audio/sc-context";
import ScSignalGen from "../../audio/sc-signalgen";
import ScSpeakers from "../../audio/sc-speakers";
import ScDelay from "../../audio/sc-delay";
import ScDirectIn from "../../audio/sc-directin";
import ScPlayer from "../../audio/sc-player";
import ScSamplePlayer from "../../audio/sc-sample-player";
import ScPan from "../../audio/sc-pan";
import ScOscilloscope from "../../audio/sc-oscilloscope";
import ScSpectroscope from "../../audio/sc-spectroscope";
import ScPitch from "../../audio/sc-pitch-phasor";
import ScTransposer from "../../audio/sc-transposer";
//import ScPitch from "../audio/sc-pitch";
import ScMixer from "../../audio/sc-mixer";
import ScReverb from "../../audio/sc-reverb";
import ScGranSynth from "../../audio/sc-granular-synthesis";
import {
  specValues,
  audioDefaults
} from "./Components/blockSpecs";

function initAudioObj(typeName, audioConfig) {
  let t;
  let audioObjPromise = new Promise((resolve, reject) => {
    switch (typeName) {
      case "Delay":
        t = new ScDelay(scContext);
        resolve(t);
        break;
      case "Transposer":
        t = new ScTransposer(scContext, audioConfig);
        resolve(t);
        break;
      case "Pan":
        t = new ScPan(scContext);
        resolve(t);
        break;
      case "Player":
        t = new ScPlayer(scContext, audioConfig);
        if (audioConfig.URL) {
          let loadPromise = t.load(audioConfig.URL);
          loadPromise.then(() => {
            resolve(t);
          });
        } else {
          resolve(t);
        }
        break;
      case "SignalGen":
        t = new ScSignalGen(scContext, audioConfig);
        resolve(t);
        break;
      case "Speaker":
        t = new ScSpeakers(scContext, audioConfig);
        resolve(t);
        break;
      case "DirectInput":
        let promise = new ScDirectIn(scContext, audioConfig);
        promise
          .then(t => {
            resolve(t);
          })
          .catch(t => {
            resolve(t);
          });
        break;
      case "Pitch":
        t = new ScPitch(scContext);
        resolve(t);
        break;
      case "Reverb":
        t = new ScReverb(scContext);
        resolve(t);
        break;
      case "GranSynth":
        t = new ScGranSynth(scContext);
        resolve(t);
        break;
        // case "Routing":
        //   t = new ScRouting(scContext);
        //   break;
      case "Mixer":
        t = new ScMixer(scContext);
        resolve(t);
        break;
      case "Oscilloscope":
        t = new ScOscilloscope(scContext);
        resolve(t);
        break;
      case "Spectroscope":
        t = new ScSpectroscope(scContext);
        resolve(t);
        break;
      case "SamplePlayer":
        t = new ScSamplePlayer(scContext);
        let promiseBook = [];
        if (audioConfig.URL) {
          audioConfig.URL.forEach((url, index) => {
            if (url && url != "") {
              promiseBook.push(t.load(index, audioConfig.URL[index]));
            }
          })
          Promise.all(promiseBook).then(() => {
            resolve(t);
          });

        } else {
          resolve(t);
        }
        break;
      default:
        t = undefined;
        reject(t);
    }
    //return t;
  });
  return audioObjPromise;
}

function asyncAddBlock(moduleType, audioConfig = {}, moduleConfig = {}) {
  return function (dispatch) {
    return initAudioObj(moduleType, audioConfig)
      .then(audioObj => dispatch(addBlock(audioObj, moduleType, moduleConfig)))
      .catch(error => dispatch(addBlock(undefined, moduleType)));
  };
}

const addBlock = (audioObj, typeName, moduleConfig) => {
  let config = Object.assign({}, specValues[typeName], moduleConfig);
  delete config.inNode;
  delete config.outNode;
  delete config.collapse;
  return {
    type: "ADD_BLOCK",
    typeName,
    audioObj: audioObj,
    values: {
      inNode: [],
      outNode: [],
      collapse: true,
      ...config
    }
  };
};

function loadProject(content) {
  let jsonContent = JSON.parse(content);
  return function (dispatch, getState) {
    let loadProjectProm = new Promise((resolve, reject) => {
      if (content === undefined || jsonContent === null) {
        dispatch({
          type: "LOAD_STATE",
          content: undefined
        });
      } else {
        // Clear store so no component will conflict
        dispatch({
          type: "LOAD_STATE",
          content: undefined
        });
        let promiseStore = [];
        let connections = [];
        //this.retrieveConnections(jsonContent);
        jsonContent["bs"].forEach((element, index) => {
          if (element.outNode.length > 0) {
            let connection = {
              nowOut: element,
              nowIn: element.outNode[0]
            };
            connections.push(connection);
          }
          delete element.audioObj;
          let audioConfig = audioDefaults[element.typeName];
          for (let key in audioConfig) {
            // console.log(key);
            audioConfig[key] = element[key];
            // console.log(audioConfig[key]);
          }
          let prom = dispatch(
            asyncAddBlock(element.typeName, audioConfig, element)
          );
          promiseStore.push(prom);
        });
        Promise.all(promiseStore).then(function () {
          let state = getState();
          let idMapper = {};
          state.blocks["bs"].forEach(element => {
            idMapper[element.id] = element;
          });
          connections.forEach((conn, index) => {
            dispatch({
              type: "CONNECTING_BLOCK",
              node: "nowOut",
              value: [
                conn.nowOut.name,
                conn.nowOut.outNode[0][3],
                conn.nowOut.id,
                idMapper[conn.nowOut.id].audioObj
              ]
            });
            dispatch({
              type: "CONNECTING_BLOCK",
              node: "nowIn",
              value: [
                conn.nowIn[0],
                conn.nowIn[2],
                conn.nowIn[1],
                idMapper[conn.nowIn[1]].audioObj
              ]
            });
          });
        });
      }
    });
    return loadProjectProm;
  };
}

export {
  asyncAddBlock,
  loadProject
};