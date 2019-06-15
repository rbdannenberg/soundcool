import block from "./block";

const allTypes = { Delay: 1, Transposer: 1, Pan: 1, Player: 1 };
const blocks = (
  state = {
    bs: [],
    nextBlockId: 1,
    nextTypeId: allTypes,
    nowIn: undefined,
    nowOut: undefined
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
        s.nowIn !== undefined &&
        s.nowOut !== undefined &&
        s.bs.filter(t => t.name === s.nowIn).length === 1 &&
        s.bs.filter(t => t.name === s.nowOut).length === 1
      ) {
        return {
          ...s,
          bs: s.bs.map(t =>
            block(t, { ...action, nowIn: s.nowIn, nowOut: s.nowOut })
          )
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
