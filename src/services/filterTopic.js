/**
 * Filter articles on a specific topic
 * @param  {array} articles
 * @param  {string} topic
 */
const filterTopic = (articles, topic) =>
  articles.filter((article) => article.topic === topic);

export default filterTopic;
