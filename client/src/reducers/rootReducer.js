import { combineReducers } from "redux";
import temperatureReducer from "./temperatureReducer";
import placeReducer from "./placeReducer";
import weatherReducer from "./weatherReducer"

const rootReducer = combineReducers({
  temperatureReducer,
  placeReducer,
  weatherReducer
});

export default rootReducer;
