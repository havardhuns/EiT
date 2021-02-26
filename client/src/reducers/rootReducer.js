import { combineReducers } from "redux";
import temperatureReducer from "./temperatureReducer";
import placeReducer from "./placeReducer";

const rootReducer = combineReducers({
  temperatureReducer,
  placeReducer,
});

export default rootReducer;
