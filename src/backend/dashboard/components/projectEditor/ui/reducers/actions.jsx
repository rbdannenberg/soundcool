import { BASE_URL } from '../../../constants';
import { getRequest, postRequest, patchRequest } from '../../../api';
export const projectUrl = () => `${BASE_URL}/projects/updateContent`;

export const updateProjectContent = payload => {
    const url = projectUrl();
    return patchRequest(url, payload);
  };