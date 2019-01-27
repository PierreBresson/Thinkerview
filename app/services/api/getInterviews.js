import axios from "axios";
import config from "../../config";

import cleanWPjson from "../../services/staticServices/cleanWPjson";

export default (getInterviews = (page, category_id) => {
  const category = category_id ? category_id : config.interview_category_id;
  let url =
    config.urls.api.base_url +
    config.urls.api.page +
    page +
    config.urls.api.category +
    category +
    config.urls.api.per_page +
    config.articlesPerPage;

  let promiseGetInterviews = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      timeout: 3000
    })
      .then(res => {
        resolve(cleanWPjson(res.data));
      })
      .catch(err => {
        reject(err);
      });
  });
  return promiseGetInterviews;
});
