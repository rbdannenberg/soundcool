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
  Reverb: 1
};
const emptyState = {
  bs: [],
  nextBlockId: 1,
  nextTypeId: allTypes,
  nowIn: [],
  nowOut: []
};
const blocks = (
  state = {
    bs: [],
    nextBlockId: 1,
    nextTypeId: allTypes,
    nowIn: [],
    nowOut: []
  },
  action
) => {
  let { bs, nextBlockId, nextTypeId, nowIn, nowOut } = state;
  switch (action.type) {
    case "ADD_BLOCK": {
      // add the count information into action, so block knows the count when newing
      // there can only be one speaker module
      if (action.typeName === "Speaker" && nextTypeId["Speaker"] == 2) {
        console.log("Can only have one speaker per project!");
        return state;
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
        nextTypeId: typeIds
      };
    }
    case "CHANGE_BLOCK":
      return {
        nextBlockId,
        nextTypeId,
        nowIn,
        nowOut,
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
        bs: newBs
      };
    case "CONNECTING_BLOCK":
      let s = { ...state };
      // in or out?
      s[action.node] = action.value;
      // if both nowIn and nowOut are assigned and the blocks exists
      if (
        s.nowIn[0] !== undefined &&
        s.nowOut[0] !== undefined &&
        s.bs.filter(t => t.id === s.nowIn[2]).length === 1 &&
        s.bs.filter(t => t.id === s.nowOut[2]).length === 1
      ) {
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
              inNode: [],
              outNode: [],
              collapse: true,
              ...specValues[element.typeName]
            },
            newId: element.id,
            newTypeId: element.typeId
          });
        });
        return newState;
      } else {
        return emptyState;
      }

    default:
      return state;
  }
};

export default blocks;
