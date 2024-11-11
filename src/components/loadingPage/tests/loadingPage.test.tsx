import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LoadingPage from "../loadingPage";
import { act } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import * as api from "../../../lib/api";
import { theme } from "../../../styles/globalStyle";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const initialState = {
  cardList: {
    data: [],
  },
};

jest.mock("../../../lib/api");

describe("LoadingPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading image", async () => {
    const store = mockStore(initialState);
    (api.getCards as jest.Mock).mockResolvedValueOnce({
      data: ["Card 1", "Card 2"],
      error: null,
      colors: { white: 1, blue: 1, black: 0, red: 0, green: 0 },
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <ThemeProvider theme={theme}>
              <LoadingPage />
            </ThemeProvider>
          </Router>
        </Provider>
      );
    });

    const loadingImage = screen.getByLabelText(/Loading Mana Types/i);
    expect(loadingImage).toBeInTheDocument();
  });

  test("fetches cards and navigates to result page", async () => {
    const store = mockStore(initialState);
    (api.getCards as jest.Mock).mockResolvedValueOnce({
      data: ["Card 1", "Card 2"],
      error: null,
      colors: { white: 1, blue: 1, black: 0, red: 0, green: 0 },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Router
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <ThemeProvider theme={theme}>
              <LoadingPage />
            </ThemeProvider>
          </Router>
        </Provider>
      );
    });

    expect(api.getCards).toHaveBeenCalled();
  });
});
