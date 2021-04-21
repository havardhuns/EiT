const initialState = { roadInformationList: [], loading: [], error: null };

export default function roadInformationReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ROAD_INFORMATION_BEGIN":
      return {
        ...state,
        loading: state.loading.concat(true),
      };
    case "ADD_ROAD_INFORMATION_SUCCESS":
      return {
        ...state,
        roadInformationList: [...state.roadInformationList, ...action.payload],
        loading: state.loading.slice(0, -1),
      };
    case "ADD_ROAD_INFORMATION_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: state.loading.slice(0, -1),
      };
    case "CLEAR_ROAD_INFORMATION":
      return initialState;
    default:
      return state;
  }
}
