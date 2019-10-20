import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const loginUrl = () => `${BASE_URL}/user/sign_in`;

export const loginUser = payload => {
    const url = loginUrl();
    return postRequest(url, payload);
  };
  export const redirectToHome = () => {
    window.location = '/home';
  };
  