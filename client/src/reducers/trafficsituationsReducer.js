const initialState = { messages: null };

export default function trafficsituationsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TRAFFIC":
      return {
        ...state,
        messages: action.messages,
      };

    default:
      return state;
  }
}
