import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ValidarSessaoEToken from "../middlewares/ValidarSessaoEToken";
import { setAuthToken } from "./ApiAxios";

export default function PrivateRoute({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  const checkAuth = () => {
    if (ValidarSessaoEToken()) {
      setAutenticado(true);
      return true;
    }
    setAutenticado(false);
    return false;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const ExibirPagina = () => {
    if (autenticado) {
      setAuthToken();
      return children;
    }
    return <Navigate to="/login" />;
  };

  return autenticado !== null && <ExibirPagina />;
}
