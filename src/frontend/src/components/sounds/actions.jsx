import { BASE_URL } from "./../constants";
import { getRequest, postRequest, performMultipartRequest } from "../api";
import { Store } from "../store";
export const uploadSoundUrl = () => `${BASE_URL}/sounds/upload`;
export const removeAudioUrl = () => `${BASE_URL}/sounds/remove`;
export const fetchAudioUrl = () => `${BASE_URL}/sounds/get`;
export const toggleAudioSharingUrl = () =>
  `${BASE_URL}/sounds/toggleAudioSharing`;
export const addSoundLinkUrl = () => `${BASE_URL}/sounds/addSoundLink`;
export const getAudioUrl = () => `${BASE_URL}/sounds/getAudio`;
export const serveAudioUrl = () => `${BASE_URL}/sounds/serveAudio`;

export const uploadSound = payload => {
  const url = uploadSoundUrl();
  return performMultipartRequest(url, "post", payload);
};
export const removeAudio = payload => {
  const url = removeAudioUrl();
  return postRequest(url, payload);
};
export const fetchAudio = () => {
  const url = fetchAudioUrl();
  return getRequest(url);
};
export const toggleAudioSharing = payload => {
  const url = toggleAudioSharingUrl();
  return postRequest(url, payload);
};

export const addSoundLink = payload => {
  const url = addSoundLinkUrl();
  return postRequest(url, payload);
};

export const serveAudio = sound_id => {
  const url =
    serveAudioUrl() + "/" + sound_id + "/" + Store.headers["X-Auth-Token"];
  return url;
};

export const getAudio = sound_id => {
  const url =
    getAudioUrl() + "/" + sound_id + "/" + Store.headers["X-Auth-Token"];
  return getRequest(url);
};
