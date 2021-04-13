import { combineReducers } from "redux";
import temperatureReducer from "./temperatureReducer";
import placeReducer from "./placeReducer";
import roadInformation from "./roadInformationReducer";
import directionsReducer from "./directionsReducer";

const rootReducer = combineReducers({
  temperatureReducer,
  placeReducer,
  directionsReducer,
  roadInformation,
});

export default rootReducer;
