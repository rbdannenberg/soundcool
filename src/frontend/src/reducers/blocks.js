import block from "./block";
import specValues from "../components/projectEditor/Components/blockSpecs.jsx";
const allTypes = {
  Delay: 1,
  Transposer: 1,
  Pan: 1,
  Player: 1,
  SignalGen: 1,
  Speaker: 1,
  DirectInput: 1,
  Pitch: 1,
  VSTHost: 1,
  Routing: 1,
  Mixer: 1,
  Record: 1,
  Spectroscope: 1,
  Oscilloscope: 1,
  Envelope: 1,
  Filter: 1,
  Keyboard: 1,
  SamplePlayer: 1,
  Sequencer: 1,
  Reverb: 1,
  GranSynth: 1
};
const emptyState = {
  bs: [],
  nextBlockId: 1,
  nextTypeId: allTypes,
  nowIn: [],
  nowOut: [],
  cns: []
};
const blocks = (
  state = {
    bs: [],
    nextBlockId: 1,
    nextTypeId: allTypes,
    nowIn: [],
    nowOut: [],
    // connections: each time we do a connection
    // we save it in the list, so that we can reconnect everything
    // when reloading the project
    cns: []
  },
  action
) => {
  let { bs, nextBlockId, nextTypeId, nowIn, nowOut, cns } = state;
  switch (action.type) {
    case "ADD_BLOCK": {
      console.log("cns is:" + cns);
      // add the count information into action, so block knows the count when newing
      // there can only be one speaker module
      if (action.typeName === "Speaker") {
        const found = bs.find(element => element["typeName"] == "Speaker");
        if (found !== undefined) {
          console.log("Can only have one speaker per project!");
          return state;
        }
      }
      let newId = nextBlockId;
      let typeIds = { ...nextTypeId };
      let newTypeId = typeIds[action.typeName]++;
      let newAction = { ...action, newId, newTypeId };
      return {
        nowIn,
        nowOut,
        bs: [...bs, block(undefined, newAction)],
        nextBlockId: newId + 1,
        nextTypeId: typeIds,
        cns
      };
    }
    case "CHANGE_BLOCK":
      return {
        nextBlockId,
        nextTypeId,
        nowIn,
        nowOut,
        cns,
        bs: bs.map(t => block(t, action))
      };
    case "DELETE_BLOCK":
      let filteredBs = bs.filter(t => t.id !== action.id);
      // let deletedBlock = bs.filter(t => t.id === action.id)[0];
      // console.log("hello: " + deletedBlock.unbindCanvas);
      // deletedBlock.unbindCanvas();
      // deletedBlock.unbindCanvas === undefined
      //   ? pass
      //   : deletedBlock.unbindCanvas();
      let newBs = filteredBs.map(t =>
        // pass in the block, so we can check for each connection that
        // whether the block still exist
        block(t, { ...action, blocks: filteredBs })
      );
      return {
        nextBlockId,
        nextTypeId,
        nowIn,
        nowOut,
        cns,
        bs: newBs
      };
    case "CONNECTING_BLOCK":
      let s = { ...state };
      if (action.isload !== true) {
        console.log("not isload");
        s.cns = [...cns, action];
      }
      // in or out?
      s[action.node] = action.value;
      // if both nowIn and nowOut are assigned and the blocks exists
      if (
        s.nowIn[0] !== undefined &&
        s.nowOut[0] !== undefined &&
        s.bs.filter(t => t.id === s.nowIn[2]).length === 1 &&
        s.bs.filter(t => t.id === s.nowOut[2]).length === 1
      ) {
        console.log("connecting stuff 3.2..");
        return {
          // go to each block and change the inNode and outNode for the connected block
          ...s,
          bs: s.bs.map(t =>
            block(t, {
              ...action,
              nowIn: s.nowIn,
              nowOut: s.nowOut
            })
          ),
          nowIn: [],
          nowOut: []
        };
      } else {
        return s;
      }

    case "LOAD_STATE":
      let newState = action.content ? action.content : undefined;

      if (newState && JSON.parse(newState) !== null) {
        newState = JSON.parse(newState);
        newState["bs"].forEach((element, index) => {
          newState["bs"][index] = block(undefined, {
            type: "ADD_BLOCK",
            typeName: element.typeName,
            values: {
              // inNode: element.inNode,
              inNode: [],
              // outNode: element.outNode,
              outNode: [],
              collapse: true,
              ...specValues[element.typeName]
            },
            newId: element.id,
            newTypeId: element.typeId
          });
        });
        // let tmp = undefined;
        // console.log(newState["cns"].length);
        // newState["cns"].forEach((action, index) => {
        //   console.log("adding connection..");
        //   tmp = blocks(newState, { ...action, isload: true });
        //   console.log("here 1");
        //   newState = tmp;
        //   console.log("here 2");
        // });
        // console.log(newState);
        return newState;
      } else {
        return emptyState;
      }

    default:
      return state;
  }
};

export default blocks;
