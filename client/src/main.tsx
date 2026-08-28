import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import PageTitle from "./components/PageTitle.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PageTitle />
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
