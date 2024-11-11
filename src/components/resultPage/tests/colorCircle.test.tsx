import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ColorCircle } from "../colorCircle";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const initialState = {
  cardList: {
    data: ["test card 1", "test card 2"],
    colors: { white: 1, blue: 1, black: 0, red: 0, green: 0 },
  },
};

describe("ColorCircle", () => {
  test("renders color circle with correct color", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ColorCircle color="blue" />
      </Provider>
    );

    expect(screen.getByLabelText(/Color circle for blue/i)).toBeInTheDocument();
  });
});
