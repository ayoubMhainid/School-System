import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/sign_in" element={<Login />} />
    </Routes>
  );
}

export default App;
