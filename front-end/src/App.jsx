import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Home } from "./shared/Home";
import { Dashboard } from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/sign_in" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
