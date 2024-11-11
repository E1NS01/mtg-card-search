export const UPDATE_LIST = "UPDATE_LIST";
export const RESET_LIST = "RESET_LIST";

export function updateCardList(
  field: keyof CardListState,
  value:
    | string[]
    | Record<string, number>
    | { message: string; url: string }
    | null
) {
  return { type: UPDATE_LIST, payload: { field, value } };
}

export function resetCardList() {
  return { type: RESET_LIST };
}
