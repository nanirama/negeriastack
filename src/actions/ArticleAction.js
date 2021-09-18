import articleService from '../services/articleService';

async function getArticleContent(id, articleType) {
  return await articleService
    .getArticleContent(id, articleType)
    .then(response => response)
    .catch(error => error);
}

export {
    getArticleContent,
};
