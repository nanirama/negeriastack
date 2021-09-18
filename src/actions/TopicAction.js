import topicService from '../services/topicService';

async function getTopicContent(title) {
    return await topicService
        .getTopicContent(title)
        .then(response => response)
        .catch(error => error);
}

export {
    getTopicContent,
};
