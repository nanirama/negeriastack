import homeService from '../services/homeService';

async function getHomeContent() {
  return await homeService
    .getHomeContent()
    .then(response => response)
    .catch(error => error);
}

export {
    getHomeContent,
};
