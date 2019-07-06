import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import interviewsReducer from "./interviewsReducer";
import categoryInterviewsReducer from "./categoryInterviewsReducer";
import articleReducer from "./articleReducer";
import categoriesReducer from "./categoriesReducer";
import offlineReducer from "./offlineReducer";

export default function getRootReducer() {
  return combineReducers({
    player: playerReducer,
    interviews: interviewsReducer,
    article: articleReducer,
    categories: categoriesReducer,
    offline: offlineReducer,
    categoryInterviews: categoryInterviewsReducer
  });
}
