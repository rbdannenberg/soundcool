const block = (state, action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return {
        typeName: action.typeName,
        id: action.newId,
        typeId: action.newTypeId,
        name: action.typeName.charAt(0) + action.newTypeId,
        collapse: false,
        audioObj: action.audioObj,
        // contains generic values like in, out, collapse and also personal values
        ...action.values
      };
      //});
      break;
    case "CHANGE_BLOCK":
      if (state.id === action.id) {
        // The case that field is an array since the module has a lot of
        // submodules (like mixer, sequencer and samplePlay), we based on the
        // submodule number to update the corresponding information in the field
        if (action.num !== undefined) {
          state[action.field][action.num] =
            // when action.value is undefined, it means a boolean true/false change
            action.value === undefined
              ? !state[action.field][action.num]
              : action.value;
        } else {
          state[action.field] =
            action.value === undefined ? !state[action.field] : action.value;
          // also update the audioObj (will ignore if there is no such field in object)
          if (state.audioObj !== undefined) {
            state.audioObj[action.field] = state[action.field];
          }
        }
        return state;
      } else {
        return state;
      }
    // deal with breaking connections when blocks are deleted
    case "DELETE_BLOCK":
      let newInNode;
      let newOutNode;
      // if the connected block no longer exist, we change the
      // entry back to undefined
      newInNode = state.inNode.map(n => {
        return action.blocks.filter(t => t.id === n[1]).length === 0
          ? undefined
          : n;
      });
      newOutNode = state.outNode.map(n => {
        return action.blocks.filter(t => t.id === n[1]).length === 0
          ? undefined
          : n;
      });
      return { ...state, inNode: newInNode, outNode: newOutNode };

    case "CONNECTING_BLOCK":
      // The name of in and out blocks
      let [nameIn, nameOut] = [action.nowIn[0], action.nowOut[0]];
      // The numbering of in/out port (some blocks will have multiple in/out)
      let [indexIn, indexOut] = [action.nowIn[1], action.nowOut[1]];
      // The id of the blocks that we are connecting
      let [idIn, idOut] = [action.nowIn[2], action.nowOut[2]];
      // eslint-disable-next-line
      let [audioObjIn, audioObjOut] = [action.nowIn[3], action.nowOut[3]];
      if (state.id === idIn) {
        if (state.id === idOut) {
          // don't connect to itself, except special case (Routing)
          return state;
        } else {
          // if this is the nowin node, we shoud update its inNode information
          let newInNode = [...state.inNode];
          newInNode[indexIn] = [nameOut, idOut];
          return { ...state, inNode: newInNode };
        }
      } else {
        if (state.id === idOut) {
          // connect the audio objects together
          if (state.audioObj !== undefined) {
            state.audioObj.connectTo(
              audioObjIn,
              parseInt(indexOut, 10),
              parseInt(indexIn, 10)
            );
          }
          // then update the ui information
          let newOutNode = [...state.outNode];
          newOutNode[indexOut] = [nameIn, idIn, indexOut, indexIn];
          return { ...state, outNode: newOutNode };
        } else {
          return state;
        }
      }

    default:
      return state;
  }
};

export default block;
