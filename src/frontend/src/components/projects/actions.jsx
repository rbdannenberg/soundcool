import { BASE_URL } from "../constants";
import { getRequest, postRequest, patchRequest } from "../api";
import { toggleAudioSharing } from "../sounds/actions";
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;
export const removeProjectURL = () => `${BASE_URL}/projects/remove`;
export const cloneProjectURL = () => `${BASE_URL}/projects/clone`;
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
export const cloneProject = payload => {
    const url = cloneProjectURL();
    return postRequest(url, payload);
};
export const addSharedUser = payload => {
    toggleAudioSharing({ sharing: true });
    const url = addSharedUserURL();
    return patchRequest(url, payload);
};

export const removeSharedUser = payload => {
    const url = removeSharedUserURL();
    return patchRequest(url, payload);
};
export const setProjectPublic = payload => {
    toggleAudioSharing({ sharing: true });
    const url = setProjectPublicURL();
    return patchRequest(url, payload);
};
