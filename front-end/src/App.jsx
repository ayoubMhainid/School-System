import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Home } from "./shared/Home";
import { Dashboard } from "./pages/admin/Dashboard";
import { ManageStudents } from "./pages/admin/ManageStudents";
import { PersisLogin } from "./pages/auth/PersisLogin";
function App() {
  return (
    <Routes>
      <Route path="/sign_in" element={<Login />} />

      <Route element={<PersisLogin />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
