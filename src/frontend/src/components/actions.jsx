import { BASE_URL } from "./constants";
import { getRequest } from "./api";
export const validateTokenUrl = () => `${BASE_URL}/user/validateToken`;

export const validateUser = token => {
  const url = validateTokenUrl() + "?token=" + token;
  return getRequest(url);
};
