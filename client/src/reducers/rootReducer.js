import { combineReducers } from 'redux';
import temperatureReducer from './temperatureReducer'


const rootReducer = combineReducers({
    temperatureReducer
});

export default rootReducer;