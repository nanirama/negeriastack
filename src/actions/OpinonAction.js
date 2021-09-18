/**
 * Created by maryobikwelu on 1/18/21
 */

import opinionService from "../services/OpinionService";

async function getOpinionContent(title) {
  return await opinionService
    .getOpinionContent(title)
    .then((response) => response)
    .catch((error) => error);
}

async function getOpinionArticles() {
  return await opinionService
    .getOpinionArticles()
    .then((response) => response)
    .catch((error) => error);
}

export { getOpinionContent, getOpinionArticles };
