var he = require('he');
import getYoutubeVideoImageURL from "./getYoutubeVideoImageURL";
import getYoutubeVideoID from "./getYoutubeVideoID";

export default cleanWPjson = (json) => {    
    let cleanJSON = [];
    json.map(json_item => {
        let item = {
            id: json_item.id,
            title: he.unescape(json_item.title.rendered),
            body: he.unescape(json_item.content.rendered.replace(/<\/?[^>]+(>|$)/g, "")),
            img_url: getYoutubeVideoImageURL(json_item.acf.youtube_link),
            video_id: getYoutubeVideoID(json_item.acf.youtube_link),
        };
        cleanJSON.push(item);
    })
    return cleanJSON;
};