import { toast } from "react-toastify";

export const noop = () => {};

export const showToastr = (type, ...rest) => {
  toast[type](...rest);
};
export const successErrorHandler = (resolve, reject) => {
  const success = (data, status) => resolve(data);
  const err = error => {
    console.error(error);
    reject && reject(error);
  };
  return {
    success,
    err
  };
};

export const baseAddress = () => {
  return (
    window.location.href.split("//")[0] +
    "//" +
    window.location.href.split("//")[1].split("/")[0]
  );
};

export const showToastrError = errObj => {
  showToastr(
    "error",
    errObj.error || errObj.err || "Something went wrong.",
    null,
    {
      timeOut: 0,
      extendedTimeOut: 0
    }
  );
};

export const getHeaders = ({ email, token }) => ({
  // 'X-Auth-Email': email,
  "X-Auth-Token": token
});

export const getCssPropById = (id, prop) => {
  var elem = document.getElementById(id);
  var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue(prop);
  return theCSSprop;
};

export const highlightElementById = (id, time = 3000) => {
  var elem = document.getElementById(id);
  elem.style.boxShadow = "10px 10px 10px darkred";
  setTimeout(function() {
    elem.style.boxShadow = "";
  }, time);
};

export const setCssPropById = ({ id, prop, time = 3000, temp = false }) => {
  var elem = document.getElementById(id);
  var orig = elem.style[prop];
  elem.style[prop] = "10px 10px 10px darkred";
  if (temp) {
    setTimeout(function() {
      elem.style[prop] = orig;
    }, time);
  }
};

export const focusElementById = id => {
  var elem = document.getElementById(id);
  elem.scrollIntoView();
};

export const cleanPayload = pd => {
  pd["bs"].forEach(o => {
    o["audioObj"] = {};
  });
  pd["cns"] = {};
  return pd;
};
