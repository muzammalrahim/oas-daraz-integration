import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const SETTING_URL = API_URL + "shop-setting";

export function createSetting(setting) {
    return axios.post(SETTING_URL+'/create/', { ...setting });
  }

export function getSetting() {
    return axios.get(`${SETTING_URL}`);
  }

export function updateSetting(setting) {
    return axios.put(SETTING_URL+'/', { ...setting });
  }
