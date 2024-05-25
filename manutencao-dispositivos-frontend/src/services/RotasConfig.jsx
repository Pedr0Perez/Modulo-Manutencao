import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Usuarios from "../pages/Usuarios";
import Dispositivos from "../pages/Dispositivos";
import ClassesInformacoes from "../pages/ClassesInformacoes";
import LoginAcessRoute from "./LoginAcessRoute";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/error/NotFoundPage";

export default function RotasConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <LoginAcessRoute>
              <Login />
            </LoginAcessRoute>
          }
          path="/login"
        />
        <Route
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          path="/"
        />
        <Route
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          path="/home"
        />
        <Route
          element={
            <PrivateRoute>
              <ClassesInformacoes />
            </PrivateRoute>
          }
          path="/classesinformacoes"
        />
        <Route
          element={
            <PrivateRoute>
              <Dispositivos />
            </PrivateRoute>
          }
          path="/dispositivos"
        />
        <Route
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
          path="/usuarios"
        />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
