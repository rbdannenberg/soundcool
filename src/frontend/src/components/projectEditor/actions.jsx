import { BASE_URL } from "../../constants";
import { getRequest, postRequest, patchRequest } from "../../api";
export const projectUrl = () => `${BASE_URL}/projects/update`;
export const projectCreateUrl = () => `${BASE_URL}/projects/new`;
export const fetchUserProjectURL = () => `${BASE_URL}/projects/project`;
const openPortUrl = `${BASE_URL}/osc/openPort`;

export const updateProject = payload => {
  const url = projectUrl();
  return patchRequest(url, payload);
};

export const createProject = payload => {
  const url = projectCreateUrl();
  return postRequest(url, payload);
};

export const fetchUserProject = projectId => {
  const url = fetchUserProjectURL() + "?projectId=" + projectId;
  return getRequest(url);
};

export const openPort = payload => {
  const url = openPortUrl;
  return postRequest(url, payload);
};
