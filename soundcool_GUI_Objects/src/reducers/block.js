const block = (state, action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return {
        typeName: action.typeName,
        id: action.newId,
        name: action.typeName.charAt(0) + action.newTypeId,
        // contains generic values like in, out, collapse and also personal values
        ...action.values
      };
    case "CHANGE_BLOCK":
      if (state.id === action.id) {
        {
          if (action.value === undefined) {
            state[action.field] = !state[action.field];
          } else if (action.relative) {
            state[action.field] = state[action.field] + action.value;
          } else {
            state[action.field] = action.value;
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
      let nameIn = action.nowIn[0];
      let nameOut = action.nowOut[0];
      let indexIn = action.nowIn[1];
      let indexOut = action.nowOut[1];
      let idIn = action.nowIn[2];
      let idOut = action.nowOut[2];
      if (state.id === idIn) {
        if (state.id === idOut) {
          // don't connect to itself, except Routing
          return state;
        } else {
          let newInNode = [...state.inNode];
          newInNode[indexIn] = [nameOut, idOut];
          return { ...state, inNode: newInNode };
        }
      } else {
        if (state.id === idOut) {
          let newOutNode = [...state.outNode];
          newOutNode[indexOut] = [nameIn, idIn];
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
