/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

import axios from "axios";
import { AXIOS_TIME_OUT } from "../constants";

const AxiosApiInstance = axios.create({
  timeout: AXIOS_TIME_OUT,
});

// Response interceptor for API calls
AxiosApiInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    // if fail
    if (
      (data.result === "success" || data.result === "fail") &&
      data.data === undefined &&
      data.message !== undefined
    ) {
      throw new Error(response.data.message);
    }

    // if success
    if (data.result === "success" && data.data !== undefined) {
      return response.data;
    }
  },
  async function (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(new Error(error.response.data.message));
    } else {
      return Promise.reject(new Error(error.message));
    }
  }
);

/* ---------------------------- Init Base Api Url --------------------------- */
export const initBaseUrl = (baseApiUrl) => {
  // Setting base api url to AxiosApiInstance
  AxiosApiInstance.interceptors.request.use((config) => {
    config.baseURL = baseApiUrl;
    return config;
  });
};

/* --------------------------------- Logging -------------------------------- */
if (process.env && process.env.NODE_ENV !== "production") {
  // logging request interceptor
  AxiosApiInstance.interceptors.request.use((request) => {
    //console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  });

  // logging response interceptor
  AxiosApiInstance.interceptors.response.use((response) => {
    //console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  });
}

export default AxiosApiInstance;
