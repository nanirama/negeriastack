import fetch from "cross-fetch";
import { checkStatus, parseJSON } from "./responseHandler";
import config from "../config/ApiConfig";

// Make an api call
export default async (
  url,
  method = "post",
  body,
  autherization,
  version = "v1"
) => {
  var headers = {};
  if (autherization) {
    headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };
  } else {
    headers = {
      "Content-Type": "application/json"
    };
  }
  if (autherization && autherization["x-key"]) headers = autherization;
  else body = JSON.stringify(body);
  const baseURL = config.apiHost + version + "/";
  return fetch(`${baseURL}${url}`, {
    method,
    body,
    headers: headers
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      throw error;
    });
};
