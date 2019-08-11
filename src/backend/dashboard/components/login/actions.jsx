import { BASE_URL } from './../constants';
import { getRequest, postRequest, patchRequest } from '../api';
export const loginUrl = () => `${BASE_URL}/users/sign_in`;

export const loginUser = payload => {
    const url = loginUrl();
    return postRequest(url, payload);
  };
  export const redirectToRoot = () => {
    window.location = '/';
  };