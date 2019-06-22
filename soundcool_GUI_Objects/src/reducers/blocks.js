import block from "./block";
import scContext from "../audio/sc-context";
import ScSignalGen from "../audio/sc-signalgen";

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
  Mixer: 1
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
            block(t, { ...action, nowIn: s.nowIn, nowOut: s.nowOut })
          ),
          nowIn: [],
          nowOut: []
        };
      } else {
        return s;
      }
    case "SAVE_STATE":
      localStorage.setItem("myState", JSON.stringify(state));
      return state;
    case "LOAD_STATE":
      let newState = localStorage.getItem("myState");
      return JSON.parse(newState);
    default:
      return state;
  }
};

export default blocks;
