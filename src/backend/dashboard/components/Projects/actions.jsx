import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const fetchUserProjectURL = () => `${BASE_URL}/projects/get`;

export const fetchUserProjects = () => {
    return getRequest(fetchUserProjectURL());
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };