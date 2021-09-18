import authService from '../services/authService';

async function subscribeUser(email) {
  return await authService
    .subscribeUser(email)
    .then(response => response)
    .catch(error => error);
}

async function isUserSubscribed() {
  const data = localStorage.getItem('email');
  if(data) {
    return true;
  }
  return false;
}

export {
    subscribeUser,
    isUserSubscribed
};
