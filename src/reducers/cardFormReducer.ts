import { RESET_FORM, UPDATE_FORM } from "../actions/cardFormActions";

const initialState: CardFormState = {
  type: "",
  name: undefined,
  cost: undefined,
  image: undefined,
  description: undefined,
  power: undefined,
  toughness: undefined,
};

function cardFormReducer(
  state: CardFormState = initialState,
  action: { type: string; payload: { field: string; value: string | number } }
) {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, [action.payload.field]: action.payload.value };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
}

export default cardFormReducer;
