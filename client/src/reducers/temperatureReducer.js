const initialState = {
  temperature: -273.15,
  time: 0,
};

export default function temperatureReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "SET_TEMPERATURE":
      return {
        ...state,
        temperature: action.temperature,
        time: action.time,
      };
    default:
      return state;
  }
}
