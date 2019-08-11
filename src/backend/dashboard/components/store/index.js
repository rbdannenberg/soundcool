import { getHeaders } from '../common';

export const Store = (function() {
  function save(key, value) {
    this[key] = value;
  }

  function populateFromProps(props) {
    const { userToken } = props;
    if (userToken) this.save('headers', getHeaders(userToken));
  }

  return {
    save: save,
    populateFromProps: populateFromProps,
  };
})();
