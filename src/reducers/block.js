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
        return action.blocks.filter(t => t.name === n).length === 0
          ? undefined
          : n;
      });
      newOutNode = state.outNode.map(n => {
        return action.blocks.filter(t => t.name === n).length === 0
          ? undefined
          : n;
      });
      return { ...state, inNode: newInNode, outNode: newOutNode };

    case "CONNECTING_BLOCK":
      let n1 = action.nowIn.slice(0, -1);
      let n2 = action.nowOut.slice(0, -1);
      let i1 = action.nowIn.slice(-1);
      let i2 = action.nowOut.slice(-1);
      if (state.name === n1) {
        if (state.name === n2) {
          // don't connect to itself, except Routing
          return state;
        } else {
          let newInNode = [...state.inNode];
          newInNode[i1] = n2;
          return { ...state, inNode: newInNode };
        }
      } else {
        if (state.name === n2) {
          let newOutNode = [...state.outNode];
          newOutNode[i2] = n1;
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
