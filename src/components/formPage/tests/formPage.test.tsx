import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import fetchMock from "jest-fetch-mock";
import { act } from "react";
import configureMockStore from "redux-mock-store";
import { theme } from "../../../styles/globalStyle";
import FormPage from "../formPage";

fetchMock.enableMocks();
jest.mock("../../../lib/api");
const mockStore = configureMockStore();
const initialState = {
  cardForm: {
    name: "test name",
    type: "Creature",
  },
};

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders form page", async () => {
  const store = mockStore(initialState);
  fetchMock.mockResponseOnce(
    JSON.stringify({
      image_uris: { art_crop: "https://placehold.co/600x428" },
    })
  );

  await act(async () => {
    render(
      <Provider store={store}>
        <Router
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <ThemeProvider theme={theme}>
            <FormPage />
          </ThemeProvider>
        </Router>
      </Provider>
    );
  });

  expect(screen.getByLabelText(/card name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/card type/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/card cost/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/card description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/card power/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/card toughness/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /submit form/i })
  ).toBeInTheDocument();
});
