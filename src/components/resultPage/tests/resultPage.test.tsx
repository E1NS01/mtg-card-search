import { render, screen } from "@testing-library/react";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "../../../styles/globalStyle";
import ResultPage from "../resultPage";

const mockStore = configureMockStore();
const initialState = {
  cardList: {
    data: [],
    error: null,
    colors: { white: 0, blue: 0, black: 0, red: 0, green: 0 },
  },
  cardForm: {
    name: "test name",
    type: "creature",
    cost: "",
    description: "",
    power: 1,
    toughness: 1,
  },
};

describe("ResultPage", () => {
  let store: MockStoreEnhanced<unknown, object>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("displays 'No Cards found!' message when there are no cards", () => {
    store = mockStore({
      ...initialState,
      cardList: {
        ...initialState.cardList,
        error: { message: "test error", url: "testurl" },
      },
    });
    render(
      <Provider store={store}>
        <Router
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <ThemeProvider theme={theme}>
            <ResultPage />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/No Cards found!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edit Search/i)).toBeInTheDocument();
  });

  test("renders card images when card data is available", () => {
    store = mockStore({
      ...initialState,
      cardList: {
        data: [
          "https://example.com/card1.png",
          "https://example.com/card2.png",
        ],
        error: null,
        colors: { white: 1, blue: 1, black: 0, red: 0, green: 0 },
      },
    });

    render(
      <Provider store={store}>
        <Router
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <ThemeProvider theme={theme}>
            <ResultPage />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    expect(screen.getByAltText(/Card Image/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument();
  });
});
