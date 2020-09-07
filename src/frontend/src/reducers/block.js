const block = (state, action) => {
  let nameOut, idOut, portOut, nameIn, idIn, portIn;
  switch (action.type) {
    case "ADD_BLOCK":
      return {
        typeName: action.typeName,
        id: action.newId,
        typeId: action.newTypeId,
        name: action.typeName.charAt(0) + action.newTypeId,
        givenName: action.typeName,
        collapse: false,
        audioObj: action.audioObj,
        // contains generic values like in, out, collapse and also personal values
        ...action.values
      };
    //});
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
        if (n) {
          return action.blocks.filter(t => t.id === n[1]).length === 0
            ? undefined
            : n;
        }
        return null;
      });
      newOutNode = state.outNode.map(n => {
        if (n) {
          return action.blocks.filter(t => t.id === n[1]).length === 0
            ? undefined
            : n;
        }
        return null;
      });
      return { ...state, inNode: newInNode, outNode: newOutNode };
    case "CONNECTING_BLOCK":
      [nameIn, portIn, idIn] = [...action.nowIn];
      let audioObjIn = action.nowIn[3];
      [nameOut, portOut, idOut] = [...action.nowOut];

      if (state.id === idIn) {
        if (state.id === idOut) {
          // don't connect to itself, except special case (Routing), TBD
          return state;
        } else {
          // if this is the nowin node, we shoud update its inNode information
          let newInNode = [...state.inNode];
          newInNode[portIn] = [nameOut, idOut, portOut];
          return { ...state, inNode: newInNode };
        }
      } else {
        if (state.id === idOut) {
          // connect the audio objects together
          if (state.audioObj !== undefined) {
            state.audioObj.connectTo(
              audioObjIn,
              parseInt(portOut, 10),
              parseInt(portIn, 10)
            );
          }
          // then update the ui information
          let newOutNode = [...state.outNode];
          newOutNode[portOut] = [nameIn, idIn, portIn];
          return { ...state, outNode: newOutNode };
        } else {
          return state;
        }
      }

    case "DISCONNECTING_BLOCK":
      [nameOut, idOut, portOut] = action.outNode;
      [nameIn, idIn, portIn] = action.inNode;
      if (state.id === idOut) {
        let newOutNode = state.outNode;
        newOutNode[portOut] = [];
        return { ...state, outNode: newOutNode };
      } else if (state.id === idIn) {
        console.log("here 1");
        let newInNode = state.inNode;
        newInNode[portIn] = [];
        return { ...state, inNode: newInNode };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default block;
