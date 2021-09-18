import axios from 'axios';
import host from '../config/env/dev';
import { WEBSITE_TOPIC } from '../constants/routeConstants/routeURL';
const topicContent = [];
class topicService {
    static async getTopicContent(title) {
        try {
            let topic = title.toLowerCase();
            if(title.toLowerCase() === 'technology' || title.toLowerCase() === 'tech') {
                topic = 'tech';
            }
            let  topicApiUrl = `${host.apiHost}${WEBSITE_TOPIC}${topic || 'news'}`
            if (topic === "opinion"){
                topicApiUrl = `${host.apiHostBase}opinion`;
            }
            if (topic === "other"){
                topicApiUrl = `${host.apiHostBase}world-news`;
            }
            console.log(topicApiUrl)
            const response = await axios
            .get(topicApiUrl)
            .then(res => res)
            .catch(err => err);

            if (topic === "opinion" || topic === "other"){
                return response.data;
            }
            return response.data.results || topicContent;
        } catch (err) {
            return topicContent;
        }
    }
}

export default topicService;