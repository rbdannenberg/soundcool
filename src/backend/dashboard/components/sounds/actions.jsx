import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;
export const uploadSoundUrl = () => `${BASE_URL}/sounds/upload`;

export const fetchUserProjects = () => {
    return getRequest(fetchUserProjectURL());
  };
  export const uploadSound = (payload) => {
    const url = uploadSoundUrl();
    return postRequest(url,payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };