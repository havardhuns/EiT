const initialState = {Bygland: "fint vær"}

export default function weatherReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
      case "SET_WEATHER":
        return {
          ...state,
          [action.placeName]: action.weather
        };
        
      default:
        return state;
    }
  }