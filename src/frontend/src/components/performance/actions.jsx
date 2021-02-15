import { BASE_URL } from "../../constants";
import { getRequest, postRequest, patchRequest } from "../../api";
import { cleanPayload } from "../../actions/common";
export const performanceCreateUrl = () => `${BASE_URL}/performances/new`;
export const removePerformanceURL = () => `${BASE_URL}/performances/remove`;
export const fetchPerformanceURL = () => `${BASE_URL}/performances/performance`;
const openPortUrl = `${BASE_URL}/osc/openPort`;

export const createPerformance = payload => {
  const url = performanceCreateUrl();
  payload["blocks"] = cleanPayload(payload.blocks);
  return postRequest(url, payload);
};

export const removePerformance = payload => {
  const url = removePerformanceURL();
  return patchRequest(url, payload);
};

export const fetchPerformance = performanceId => {
  const url = fetchPerformanceURL() + "?performanceId=" + performanceId;
  return getRequest(url);
};

export const openPort = payload => {
  const url = openPortUrl;
  return postRequest(url, payload);
};
