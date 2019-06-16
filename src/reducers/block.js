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
      if (
        state.inNode !== undefined &&
        action.blocks.filter(t => t.name === state.inNode).length === 0
      ) {
        newInNode = undefined;
      } else {
        newInNode = state.inNode;
      }
      if (
        state.outNode !== undefined &&
        action.blocks.filter(t => t.name === state.outNode).length === 0
      ) {
        newOutNode = undefined;
      } else {
        newOutNode = state.outNode;
      }
      return { ...state, inNode: newInNode, outNode: newOutNode };

    case "CONNECTING_BLOCK":
      if (state.name === action.nowIn) {
        if (state.name === action.nowOut) {
          return state;
        } else {
          return { ...state, inNode: action.nowOut };
        }
      } else {
        if (state.name === action.nowOut) {
          return { ...state, outNode: action.nowIn };
        } else {
          return state;
        }
      }

    default:
      return state;
  }
};

export default block;
