import fetch from "cross-fetch";
import { checkStatus, parseJSON } from "./responseHandler";
import config from "../config/ApiConfig";
import LSM from "../storage/LocalStorageManager";
import Constants from "../storage/constants/storageKeys";

// Make an api call
export default async (url, method = "get", authorization, version = "v1") => {
  var headers = {};
  const xAccessToken = LSM.fetchItem(Constants.tokenInfo);
  const xKey = LSM.fetchItem(Constants.email);
  if (authorization) {
    headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      "x-access-token": xAccessToken,
      "x-key": xKey
      // Origin
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      "x-access-token": xAccessToken,
      "x-key": xKey
      // Origin
    };
  }
  const baseURL = config.apiHost + version + "/";
  return fetch(`${baseURL}${url}`, {
    method,
    headers: headers
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      throw error;
    });
};
