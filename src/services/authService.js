import axios from 'axios';
import host from '../config/env/dev';

class authService {
  static async subscribeUser(email) {
      const response = await axios
        .post(`${host.signupUrl}`, { email })
        .then(res => res)
        .catch(err => err);
      localStorage.setItem('email', email);
      return response.data.message;
  }
}

export default authService;