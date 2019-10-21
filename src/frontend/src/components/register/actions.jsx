import { BASE_URL } from './../constants';
import { postRequest } from '../api';
export const registerUrl = () => `${BASE_URL}/user/register`;

export const registerUser = payload => {
    const url = registerUrl();
    return postRequest(url, payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };
