import { BASE_URL } from './constants';
import { getRequest, postRequest, patchRequest } from './api';
import { signInUrl, onboardingPageUrl } from './urls';

const userRegistrationUrl = () => `${BASE_URL}/users/`;

const resetPasswordUrl = () => `${BASE_URL}/users/password`;

const changePasswordUrl = () => `${BASE_URL}/users/password`;

const emailValidationUrl = () => `${BASE_URL}/users/validate_email`;

export const loginUrl = () => `${BASE_URL}/users/sign_in`;

export const registerNewUser = payload => {
  const url = userRegistrationUrl();
  return postRequest(url, payload);
};