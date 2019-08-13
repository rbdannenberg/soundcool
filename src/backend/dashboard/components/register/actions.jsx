import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const registerUrl = () => `${BASE_URL}/user/register`;

export const registerUser = payload => {
    const url = registerUrl();
    return postRequest(url, payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };