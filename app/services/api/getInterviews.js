import axios from "axios";
import config from "../../config";

import cleanWPjson from "../../services/staticServices/cleanWPjson";

export default (getInterviews = (page, category_id) => {
  const category = category_id ? category_id : config.interview_category_id;
  let url =
    config.urls.api.base_url +
    config.urls.api.category +
    category +
    "&per_page=60";
  // + config.urls.api.page + page;
  console.log(url);

  let promiseGetInterviews = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(cleanWPjson(res.data));
      })
      .catch(err => {
        reject(err);
      });
  });
  return promiseGetInterviews;
});
