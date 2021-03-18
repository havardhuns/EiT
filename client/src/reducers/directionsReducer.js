const initialState = {
  directions: null,
  selectedRouteIndex: 0,
};

export default function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DIRECTIONS":
      return {
        ...state,
        directions: action.payload,
        selectedRouteIndex: 0,
      };
    case "SET_ROUTE_INDEX":
      return {
        ...state,
        selectedRouteIndex: action.payload,
      };
    default:
      return state;
  }
}
