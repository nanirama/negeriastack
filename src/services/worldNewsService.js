import axios from "axios";
import host from "../config/env/dev";

const getWorldNews = async () => {
  try {
    const { data } = await axios.get(`${host.apiHostBase}world-news/`);
    return data;
  } catch (error) {
    return [];
  }
};

export default getWorldNews;
