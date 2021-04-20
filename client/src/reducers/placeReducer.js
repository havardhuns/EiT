const initialState = {
  origin: null,
  destination: null,
  singleMarker: null,
  temporaryMarker: null,
};

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ORIGIN":
      return {
        ...state,
        origin: action.payload,
      };
    case "SET_DESTINATION":
      return {
        ...state,
        destination: action.payload,
      };
    case "SET_SINGLE_MARKER":
      return {
        ...state,
        singleMarker: action.payload,
      };
    case "SET_TEMPORARY_MARKER":
      return {
        ...state,
        temporaryMarker: action.payload,
      };
    default:
      return state;
  }
}
