import { BASE_URL } from "../constants";
import { getRequest } from "../api";
export const fetchPresetURL = `${BASE_URL}/presets/load`;

export const fetchPreset = presetId => {
  return getRequest(fetchPresetURL + "/" + presetId);
};