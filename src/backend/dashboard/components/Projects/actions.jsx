import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;
export const removeProjectURL = () => `${BASE_URL}/projects/remove`;
export const shareProjectURL = () => `${BASE_URL}/projects/share`;

export const fetchUserProjects = () => {
    return getRequest(fetchUserProjectURL());
  };
  export const removeProject = payload => {
    const url = removeProjectURL();
    return patchRequest(url, payload);
  };
  export const shareProject = payload => {
    const url = shareProjectURL();
    return patchRequest(url, payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };