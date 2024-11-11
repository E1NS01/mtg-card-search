import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/globalStyle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResultPage from "./components/resultPage/resultPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormPage from "./components/formPage/formPage";
import LoadingPage from "./components/loadingPage/loadingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
      <ToastContainer
        limit={1}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
