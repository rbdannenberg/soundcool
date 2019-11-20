import { getHeaders } from "./actions/common";

export const StoreX = (function() {
  function save(key, value) {
    this[key] = value;
  }

  function populateFromProps(props) {
    const { userToken } = props;
    if (userToken) this.save("headers", getHeaders(userToken));
  }

  return {
    save: save,
    populateFromProps: populateFromProps
  };
})();
