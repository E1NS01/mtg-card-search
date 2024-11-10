export const UPDATE_FORM = "UPDATE_FORM";
export const RESET_FORM = "RESET_FORM";

export function updateCardForm(field: string, value: string | number) {
  return { type: UPDATE_FORM, payload: { field, value } };
}

export function resetCardForm() {
  return { type: RESET_FORM };
}
