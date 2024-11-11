interface CardFormProps {
  updateCardForm: (field: string, value: string) => void;
  resetCardForm: () => void;
  resetCardList: () => void;
}

interface LoadingProps {
  updateCardList: (
    field: string,
    value: string[] | Record<string, number>
  ) => void;
}

interface CardFormState {
  type: "creature" | "enchantment" | "instant" | "sorcery" | "land" | "";
  name: string;
  cost: number | undefined;
  image: string;
  description: string | undefined;
  power: number | undefined;
  toughness: number | undefined;
}

interface CardListState {
  data: string[];
  colors: Record<string, number>;
}

interface CardListAction {
  type: string;
  payload: {
    field: keyof CardListState;
    value: string[] | Record<string, number>;
  };
}

type RootState = ReturnType<typeof rootReducer>;

interface ColorCircleProps {
  color: string;
}
interface StyledInputProps {
  width?: string;
}
