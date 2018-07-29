import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import interviewsReducer from "./interviewsReducer";
import articleReducer from "./articleReducer";
import categoriesReducer from "./categoriesReducer";

export default function getRootReducer() {
  return combineReducers({
    player: playerReducer,
    interviews: interviewsReducer,
    article: articleReducer,
    categories: categoriesReducer
  });
}
