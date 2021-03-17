const initialState = {
  directions: null,
};

export default function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DIRECTIONS":
      return {
        ...state,
        directions: action.payload,
      };
    default:
      return state;
  }
}
