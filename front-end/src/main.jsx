import React, { createContext } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppContextCom from "./context/AppContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextCom>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextCom>
  </StrictMode>
);
