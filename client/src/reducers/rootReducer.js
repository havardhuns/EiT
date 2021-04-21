import { combineReducers } from "redux";
import temperatureReducer from "./temperatureReducer";
import placeReducer from "./placeReducer";
import roadInformationReducer from "./roadInformationReducer";
import directionsReducer from "./directionsReducer";

const rootReducer = combineReducers({
  temperatureReducer,
  placeReducer,
  directionsReducer,
  roadInformationReducer,
});

export default rootReducer;
