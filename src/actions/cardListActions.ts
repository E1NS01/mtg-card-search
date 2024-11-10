export const UPDATE_LIST = "UPDATE_LIST";
export const RESET_LIST = "RESET_LIST";

export function updateCardList(
  field: string,
  value: string[] | Record<string, number>
) {
  return { type: UPDATE_LIST, payload: { field, value } };
}

export function resetCardList() {
  return { type: RESET_LIST };
}
