import { SELECT_ARTICLE, SHARE_SOCIAL_ACTION } from "../actions/types";

const initialState = {
  articleSelected: null,
  shareSocialOpen: false
};

export default (articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ARTICLE:
      return {
        ...state,
        articleSelected: action.article
      };
    case SHARE_SOCIAL_ACTION:
      return {
        ...state,
        shareSocialOpen: !state.shareSocialOpen
      };
    default:
      return state;
  }
});
