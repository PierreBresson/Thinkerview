import { SELECT_ARTICLE, SHARE_SOCIAL_ACTION } from "./types";

export const selectArticle = article => {
  return {
    type: SELECT_ARTICLE,
    article
  };
};

export const shareSocialAction = () => {
  return {
    type: SHARE_SOCIAL_ACTION
  };
};
