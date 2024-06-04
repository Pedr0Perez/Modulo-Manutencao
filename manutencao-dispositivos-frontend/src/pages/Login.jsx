import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardLogin from "../components/CardLogin";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "../components/ThemeBtn";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import LogoSis from "../assets/logo-sis.png";
import "./styles/Login.css";
import { api, setAuthToken } from "../services/ApiAxios";
import CriptografarDados from "../services/CriptografarDados";

export default function Login() {
  const InvalidUserAlert = () => {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">E-mail ou senha inválido(a).</Alert>
      </Stack>
    );
  };

  const LinearLoad = () => {
    return (
      <Stack sx={{ width: "100%", color: red[700] }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>
    );
  };

  const [exibirLoadForm, setExibirLoadForm] = useState(false);

  const submitBtnRef = useRef(null);

  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const autenticarLogin = async () => {
    setInvalidUser(false);
    setExibirLoadForm(true);
    const body = {
      email: email,
      senha: senha,
    };

    await api
      .post("/login/auth", body)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.removeItem("dataUser");
          const token = response.data.token;
          const expire_date = new Date(response.data.date_expire);

          const expires = new Date();
          expires.setTime(expires.getTime() + 4 * 60 * 60 * 1000); // 4 horas em milissegundos
          const expiresString = expires.toUTCString();

          const dataUser = {
            email: response.data.email,
            name: response.data.allName,
            firstName: response.data.nome,
            expireDate: response.data.expire_date,
          };

          document.cookie = `token=${token};expires=${expire_date};path=/;`;

          console.log(expire_date + '\n' + expiresString);

          const dadosSessaoCriptografados = CriptografarDados(
            JSON.stringify(dataUser)
          );

          localStorage.setItem("dataUser", dadosSessaoCriptografados);
          setAuthToken();
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          setExibirLoadForm(false);
          setInvalidUser(true);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardLogin>
        {exibirLoadForm && (
          <div className="load-container">
            <LinearLoad
              className="p-absolute"
              style={{ top: 0, position: "absolute" }}
            />
          </div>
        )}
        {exibirLoadForm && <div className="overlay-dialog"></div>}
        <div className="form-login">
          <div className="row justify-content-center">
            <div className="col-sm-auto">
              <span className="sis-logo-container">
                <img src={LogoSis} alt="Logotipo" className="sis-logo" />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2
                className=".MuiTypography-h2 text-align-center mb-1"
                style={{ color: grey[900] }}
              >
                Login
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <h5 className="text-align-center" style={{ color: grey[800] }}>
                Entre com sua conta
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-3">
                <ThemeBtn>
                  <TextField
                    type="email"
                    label="E-mail"
                    autoCapitalize="none"
                    autoComplete="off"
                    error={invalidUser}
                    variant="outlined"
                    sx={{ textTransform: "none", width: "302px" }}
                    fullWidth
                    value={email}
                    disabled={exibirLoadForm ? true : false}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && email && senha) {
                        submitBtnRef.current.focus();
                      }
                    }}
                  />
                </ThemeBtn>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-3">
                <ThemeBtn>
                  <TextField
                    type="password"
                    label="Senha"
                    autoComplete="off"
                    autoCapitalize="none"
                    value={senha}
                    error={invalidUser}
                    helperText={
                      invalidUser
                        ? "⛔ Não foi possível encontrar sua conta."
                        : ""
                    }
                    variant="outlined"
                    sx={{ textTransform: "none", width: "302px" }}
                    fullWidth
                    disabled={exibirLoadForm ? true : false}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && email && senha) {
                        submitBtnRef.current.focus();
                      }
                    }}
                  />
                </ThemeBtn>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-3">
                <ThemeBtn>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", width: "302px" }}
                    fullWidth
                    disabled={!email || !senha || exibirLoadForm ? true : false}
                    onClick={() => {
                      autenticarLogin();
                    }}
                    ref={submitBtnRef}
                  >
                    Entrar
                  </Button>
                </ThemeBtn>
              </div>
            </div>
          </div>
        </div>
      </CardLogin>
    </div>
  );
}
