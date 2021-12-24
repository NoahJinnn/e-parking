import { CORE_SERVICE_URL } from 'app-const';

import axiosUtil from './api';

export const getAllParks = async () => {
  try {
    const res = await axiosUtil.get(`${CORE_SERVICE_URL}/parks`);
    console.log(res);
  } catch (error) {
    console.log("Get parks failed!\n" + error);
  }
};
