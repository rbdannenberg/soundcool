import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;
export const removeProjectURL = () => `${BASE_URL}/projects/remove`;
export const setProjectPublicURL = () => `${BASE_URL}/projects/setPublic`;
export const removeSharedUserURL = () => `${BASE_URL}/projects/removeShare`;
export const addSharedUserURL = () => `${BASE_URL}/projects/addShare`;

export const fetchUserProjects = () => {
    return getRequest(fetchUserProjectURL());
  };
  export const removeProject = payload => {
    const url = removeProjectURL();
    return patchRequest(url, payload);
  };
  export const addSharedUser = payload => {
    const url = addSharedUserURL();
    return patchRequest(url, payload);
  };

  export const removeSharedUser = payload => {
    const url = removeSharedUserURL();
    return patchRequest(url, payload);
  };
  export const setProjectPublic = payload => {
    const url = setProjectPublicURL();
    return patchRequest(url, payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };