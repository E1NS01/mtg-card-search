import { RESET_LIST, UPDATE_LIST } from "../actions/cardListActions";

const initialState = {
  data: [],
  error: null,
  colors: {
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0,
  },
};

function cardListReducer(
  state: CardListState = initialState,
  action: {
    type: string;
    payload: { field: keyof CardListState; value: unknown };
  }
) {
  switch (action.type) {
    case UPDATE_LIST:
      return { ...state, [action.payload.field]: action.payload.value };
    case RESET_LIST:
      return initialState;
    default:
      return state;
  }
}

export default cardListReducer;
