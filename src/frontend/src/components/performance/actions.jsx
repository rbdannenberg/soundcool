import { BASE_URL } from "../../constants";
import { getRequest, postRequest, patchRequest } from "../../api";
import { cleanPayload } from "../../actions/common";
export const performanceCreateUrl = () => `${BASE_URL}/performances/new`;
export const removePerformanceURL = () => `${BASE_URL}/performances/remove`;
export const fetchPerformanceURL = () => `${BASE_URL}/performances/performance`;
const openPortUrl = `${BASE_URL}/osc/openPort`;
const getPortsUrl = `${BASE_URL}/osc/getPorts`;

export const createPerformance = payload => {
  const url = performanceCreateUrl();
  payload["blocks"] = cleanPayload(payload.blocks);
  return postRequest(url, payload);
};

export const removePerformance = payload => {
  const url = removePerformanceURL();
  return patchRequest(url, payload);
};

export const fetchPerformance = performanceName => {
  // const url = fetchPerformanceURL() + "?performanceId=" + performanceId;
  const url = fetchPerformanceURL() + "?performanceName=" + performanceName;
  return getRequest(url);
};

export const openPort = payload => {
  const url = openPortUrl;
  return postRequest(url, payload);
};

// ask the server to assign a set of available ports
export const getPorts = payload => {
  const url = getPortsUrl;
  return postRequest(url, payload);
};
