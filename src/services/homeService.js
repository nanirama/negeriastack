import axios from 'axios';
import host from '../config/env/dev';
import { HOME } from '../constants/routeConstants/routeURL';

class homeService {
    static async getHomeContent() {
      try {
        const response = await axios
          .get(`${host.apiHost}${HOME}`)
          .then(res => res)
          .catch(err => err);
        return response;
      } catch (err) {
        return [];
      }
    }
}

export default homeService;