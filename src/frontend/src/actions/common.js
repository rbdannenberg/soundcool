import {
  toast
} from "react-toastify";
import Cookies from "universal-cookie";
import socketIOClient from "socket.io-client";

const cookies = new Cookies();

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
    null, {
      timeOut: 0,
      extendedTimeOut: 0
    }
  );
};

export const getHeaders = ({
  email,
  token
}) => ({
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
  setTimeout(function () {
    elem.style.boxShadow = "";
  }, time);
};

export const setCssPropById = ({
  id,
  prop,
  time = 3000,
  temp = false
}) => {
  var elem = document.getElementById(id);
  var orig = elem.style[prop];
  elem.style[prop] = "8px 8px 8px darkred";
  if (temp) {
    setTimeout(function () {
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

export const removeByAttr = (arr, attr, value) => {
  var i = arr.length;
  while (i--) {
    if (arr[i] && arr[i].hasOwnProperty(attr) && arr[i][attr] === value) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export const updateRecentProjects = (projectId, projectName) => {
  var recentP = localStorage.getItem("recentProjects") ?
    JSON.parse(localStorage.getItem("recentProjects")) :
    [];
  var recentPSize = localStorage.getItem("recentProjectsSize") ?
    localStorage.getItem("recentProjectsSize") :
    3;
  removeByAttr(recentP, "id", projectId);
  recentP.unshift({
    id: projectId,
    lastActive: Math.floor(Date.now() / 1000),
    projectName: projectName
  });
  while (recentP.length > recentPSize) {
    recentP.pop();
  }
  localStorage.setItem("recentProjects", JSON.stringify(recentP));
};

export const timedifference = (start, end) => {
  var seconds = Math.ceil(end - start);
  if (seconds > 59) {
    return Math.ceil(seconds / 60) + " min";
  } else {
    return seconds + " sec";
  }
};

export const clearData = () => {
  cookies.remove("name", {
    path: "/"
  });
  cookies.remove("token", {
    path: "/"
  });
  cookies.remove("token", {
    path: "/project-editor"
  });
  localStorage.clear();
};

export const getCurrentProjectId = () => {
  let location = window.location.href.split("/");
  if (location[3] === 'project-editor' && location[4] !== null && location[4] !== 'new') {
    return location[4];
  }
  return null;
};

export const getCurrentPerformanceId = () => {
  let location = window.location.href.split("/");
  if (location[3] === 'performance' && location[4] !== null) {
    return location[4];
  }
  return null;
};

export const isUserLoggedIn = () => {
  return cookies.get("token") || "";
};


export const commonSocket = socketIOClient(baseAddress());