import { combineReducers } from "redux";
import temperatureReducer from "./temperatureReducer";
import placeReducer from "./placeReducer";
import weatherReducer from "./weatherReducer"
import directionsReducer from "./directionsReducer"

const rootReducer = combineReducers({
  temperatureReducer,
  placeReducer,
  weatherReducer,
  directionsReducer,
});

export default rootReducer;
