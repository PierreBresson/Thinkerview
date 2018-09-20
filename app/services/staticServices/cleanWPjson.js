var he = require("he");
import getYoutubeVideoImageURL from "./getYoutubeVideoImageURL";
import getYoutubeVideoID from "./getYoutubeVideoID";
import config from "../../config";

export default (cleanWPjson = json => {
  let cleanJSON = [];
  json.map(json_item => {
    let item = {
      id: json_item.id,
      categories: json_item.categories,
      title: he.unescape(json_item.title.rendered),
      body: he.unescape(
        json_item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
      ),
      img_url: getYoutubeVideoImageURL(json_item.acf.youtube),
      video_id: getYoutubeVideoID(json_item.acf.youtube),
      audio_link:
        config.urls.api.podcast_download +
        json_item.id +
        "/" +
        json_item.slug +
        ".mp3?ref=appthk"
    };
    cleanJSON.push(item);
  });
  return cleanJSON;
});
