import { toast } from "react-toastify";

export const noop = () => {};

export const showToastr = (type, ...rest) => {
  toast[type](...rest);
};
export const isUserLoggedIn = () => {
  return sessionStorage.getItem("jwtToken");
};
export const successErrorHandler = (resolve, reject) => {
  const success = (data, status) => resolve(data);
  const err = error => {
    console.error(error);
    reject && reject(error);
  };
  return {
    success,
    err
  };
};

export const showToastrError = errObj => {
  showToastr("error", errObj.error || "Something went wrong.", null, {
    timeOut: 0,
    extendedTimeOut: 0
  });
};

export const getHeaders = ({ email, token }) => ({
  // 'X-Auth-Email': email,
  "X-Auth-Token": token
});
