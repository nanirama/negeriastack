import axios from 'axios';
import host from '../config/env/dev';
const articleContent = {};
class articleService {
  static async getArticleContent(id, articleType) {
    let apiUrl = `${host.apiHost}${id}`
    if (articleType === "opinion"){
      apiUrl = `${host.apiHostBase}opinion/${id}`;
    }
    else if (articleType === "world"){
      apiUrl = `${host.apiHostBase}world-news/${id}`
    }

    try {
      const response = await axios
        .get(apiUrl)
        .then(res => res)
        .catch(err => err);
      return response.data || articleContent;
    } catch(err) {
      return articleContent
    }
  }
}

export default articleService;