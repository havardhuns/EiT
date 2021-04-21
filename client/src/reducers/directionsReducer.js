const initialState = {
  directions: null,
  selectedRouteIndex: 0,
  routePath: null,
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
    case "SET_ROUTE_PATH":
      return {
        ...state,
        routePath: action.payload,
      };
    case "CLEAR_DIRECTIONS":
      return initialState;
    default:
      return state;
  }
}
