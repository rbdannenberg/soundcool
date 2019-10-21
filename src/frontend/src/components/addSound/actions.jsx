import { BASE_URL } from './../constants';
import { getRequest, postRequest, performMultipartRequest } from '../api';
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;
export const uploadSoundUrl = () => `${BASE_URL}/sounds/upload`;
export const removeAudioUrl = () => `${BASE_URL}/sounds/remove`;
export const fetchAudioUrl = () => `${BASE_URL}/sounds/get`;

export const fetchUserProjects = () => {
    return getRequest(fetchUserProjectURL());
  };
  export const uploadSound = (payload) => {
    const url = uploadSoundUrl();
    return performMultipartRequest(url,"post",payload);
  };
  export const removeAudio = (payload) => {
    const url = removeAudioUrl();
    return postRequest(url,payload);
  };
  export const fetchAudio = () => {
    const url = fetchAudioUrl();
    return getRequest(url);
  };


  export const redirectToRoot = () => {
    window.location = '/';
  };
