/**
 * Created by maryobikwelu on 1/18/21
 */

import axios from "axios";
import host from "../config/env/dev";
import { HOME } from "../constants/routeConstants/routeURL";

class opinionService {
  static async getOpinionContent() {
    try {
      return await axios
        .get(`${host.apiHost}${HOME}`)
        .then((res) => res)
        .catch((err) => err);
    } catch (err) {
      return [];
    }
  }

  static async getOpinionArticles() {
    try {
      return await axios
        .get(`${host.apiHostBase}opinion/`)
        .then((res) => res)
        .catch((err) => err);
    } catch (error) {
      return [];
    }
  }
}

export default opinionService;
