import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import interviewsReducer from "./interviewsReducer"

export default function getRootReducer() {  
  return combineReducers({
    player: playerReducer,
    interviews: interviewsReducer
  });
}
