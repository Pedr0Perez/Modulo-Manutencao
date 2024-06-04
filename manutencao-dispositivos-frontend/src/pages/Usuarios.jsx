import React, { useState, useEffect } from "react";
import AlterarTitlePagina from "../services/AlterarTitlePagina";
import TextField from "@mui/material/TextField";
import { api } from "../services/ApiAxios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import ThemeBtn from "../components/ThemeBtn";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Skeleton } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TableUsuariosSkeleton from "../components/UsuariosPage/TableUsuariosSkeleton";
import TooltipCustom from "../components/TooltipCustom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const converterData = (dataISO) => {
  // Separa a string em partes: ano, mês e dia
  const partes = dataISO.split("-");
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1; // Mês começa de 0 em JavaScript
  const dia = parseInt(partes[2], 10);

  // Cria uma data com os valores no horário local
  const data = new Date(ano, mes, dia);

  // Formata o dia e mês para garantir dois dígitos
  const diaFormatado = data.getDate().toString().padStart(2, "0");
  const mesFormatado = (data.getMonth() + 1).toString().padStart(2, "0");

  return `${diaFormatado}/${mesFormatado}/${data.getFullYear()}`;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Usuarios() {
  const [dadosUsuarioCadastrar, setDadosUsuarioCadastrar] = useState({
    firstName: "",
    lastName: "",
    email: "",
    email2: "",
    password: "",
    birthDate: "",
    gender: "",
    country: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    setDadosValidados(validarDados());
  }, [dadosUsuarioCadastrar]);

  const validarEmail = () => {
    let validar = true;
    setEmailRepetidoError("");
    listaUsuariosTabela.map((user) => {
      if (user.mail === dadosUsuarioCadastrar.email && operacaoAtual === 0) {
        validar = false;
        setEmailRepetidoError(
          "⛔ Endereço de e-mail já utilizado. Tente outro."
        );
      } else if (
        user.mail === dadosUsuarioCadastrar.email &&
        user.id !== idUserAtual
      ) {
        validar = false;
        setEmailRepetidoError(
          "⛔ Endereço de e-mail já utilizado. Tente outro."
        );
      }
    });
    return validar;
  };

  const [exibirLoadDialog, setExibirLoadDialog] = useState(false);

  const [open, setOpen] = useState(false);
  const openDialog = (callback) => {
    callback(true);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setExibirLoadDialog(false);
    setCadastrarOuAtualizarUsuarioDialog(false);
    setConfirmarCadastrarAtualizarOuApagarUsuarioDialog(false);
    limparEstadoDadosUsuario();
  };

  const [operacaoAtual, setOperacaoAtual] = useState(null);

  const retornaFuncaoAChamar = () => {};

  const [
    cadastrarOuAtualizarUsuarioDialog,
    setCadastrarOuAtualizarUsuarioDialog,
  ] = useState(false);

  const [
    confirmarCadastrarAtualizarOuApagarUsuarioDialog,
    setConfirmarCadastrarAtualizarOuApagarUsuarioDialog,
  ] = useState(false);

  const [idUserAtual, setIdUserAtual] = useState(null);

  const [cadastrarOuAtualizarUsuario, setCadastrarOuAtualizarUsuario] =
    useState(0); //0 para cadastrar usuário, 1 para atualizar usuário. Esse estado controla se o dialog que é compartilhado por ambas as funcionalidades

  const [dadosValidados, setDadosValidados] = useState(false);

  const [emailRepetidoError, setEmailRepetidoError] = useState("");

  const LinearLoad = () => {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }}>
        <ThemeBtn>
          <LinearProgress />
        </ThemeBtn>
      </Stack>
    );
  };

  const handleClose = () => {
    closeDialog();
  };

  const validarDados = () => {
    let validar = true;

    const requiredInputs = [
      "firstName",
      "lastName",
      "email",
      "password",
      "birthDate",
      "gender",
    ];

    requiredInputs.map((input) => {
      if (
        dadosUsuarioCadastrar[input] === "" ||
        dadosUsuarioCadastrar[input] === null ||
        dadosUsuarioCadastrar[input].trim().length <= 0
      ) {
        validar = false;
      }
    });

    const emailValido = validarEmail();

    if (!emailValido) return false;

    return validar;
  };

  const limparEstadoDadosUsuario = () => {
    setIdUserAtual(null);
    setOperacaoAtual(null);
    setDadosUsuarioCadastrar({
      firstName: "",
      lastName: "",
      email: "",
      email2: "",
      password: "",
      birthDate: "",
      gender: "",
      country: "",
      city: "",
      state: "",
    });
  };

  const [listaUsuarios, setListaUsuarios] = useState(null);
  const buscarTodosUsuarios = async () => {
    api
      .get("/usuarios")
      .then((response) => {
        setListaUsuarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    AlterarTitlePagina("Usuários");
    buscarTodosUsuarios();
    limparEstadoDadosUsuario();
  }, []);

  const [listaUsuariosTabela, setListaUsuariosTabela] = useState([]);

  const TableUsuarios = ({ listaUsuariosProp }) => {
    useEffect(() => {
      if (
        listaUsuariosProp !== null &&
        typeof listaUsuariosProp !== "undefined"
      ) {
        setListaUsuariosTabela(listaUsuariosProp);
      }
    }, [listaUsuariosProp]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const paginatedRows = listaUsuariosTabela.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <b>Nome completo</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>E-mail</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>E-mail reserva</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Gênero</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Aniversário</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Cidade</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Ações</b>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.firstName + " " + row.lastName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.mail ?? "Não cadastrado"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.mail2 === null || row.mail2 === ""
                          ? "Não cadastrado"
                          : row.mail2}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.gender === "M"
                          ? "Masculino"
                          : row.gender === "F"
                          ? "Feminino"
                          : row.gender === "E"
                          ? "Outro"
                          : "Indefinido"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {converterData(row.birthDate)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.city + ", " + row.state}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className="table-btn-container">
                          <TooltipCustom title="Atualizar usuário">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdUserAtual(row.id);
                                setCadastrarOuAtualizarUsuario(1);
                                setDadosUsuarioCadastrar({
                                  firstName: row.firstName,
                                  lastName: row.lastName,
                                  email: row.mail,
                                  email2: row.mail2,
                                  password: "pass-def",
                                  birthDate: row.birthDate,
                                  gender: row.gender,
                                  country: row.country,
                                  city: row.city,
                                  state: row.state,
                                });
                                setOperacaoAtual(1);
                                openDialog(
                                  setCadastrarOuAtualizarUsuarioDialog
                                );
                              }}
                            >
                              <EditIcon />
                            </button>
                          </TooltipCustom>
                          <TooltipCustom title="Apagar usuário">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdUserAtual(row.id);
                                setOperacaoAtual(2);
                                openDialog(
                                  setConfirmarCadastrarAtualizarOuApagarUsuarioDialog
                                );
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </TooltipCustom>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={2} className="mt-2">
              <Pagination
                count={Math.ceil(listaUsuariosTabela.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                size="large"
                disabled={listaUsuariosTabela.length <= rowsPerPage}
              />
            </Stack>
          </div>
        </div>
      </div>
    );
  };

  const cadastrarUsuario = async () => {
    setExibirLoadDialog(true);
    await api
      .post("/usuarios/cadastrarusuario", dadosUsuarioCadastrar)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          closeDialog();
          toast.success("Usuário cadastrado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao cadastrar o usuário.");
      });
  };

  const atualizarUsuario = async () => {
    setExibirLoadDialog(true);
    await api
      .put(`/usuarios/atualizarusuario/${idUserAtual}`, dadosUsuarioCadastrar)
      .then((response) => {
        if (response.status === 200) {
          closeDialog();
          toast.success("Usuário atualizado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao atualizar o usuário.");
      });
  };

  const apagarUsuario = async () => {
    setExibirLoadDialog(true);
    await api
      .delete(`/usuarios/deletarusuario/${idUserAtual}`)
      .then((response) => {
        if (response.status === 204) {
          closeDialog();
          toast.success("Usuário apagado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao apagar o usuário.");
      });
  };

  return (
    <div className="god">
      <Header />
      <ToastContainer />
      <main className="content-page">
        <Navbar />
        <div className="card card-page m-2">
          <div className="card-header">
            <h4 className="m-2">Usuários</h4>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <div className="row">
                <div className="col-sm-auto">
                  <div className="mb-3">
                    <ThemeBtn>
                      {listaUsuarios && (
                        <Button
                          variant="contained"
                          sx={{ textTransform: "none", width: "200px" }}
                          fullWidth
                          onClick={() => {
                            setOperacaoAtual(0);
                            setCadastrarOuAtualizarUsuario(0);
                            openDialog(setCadastrarOuAtualizarUsuarioDialog);
                          }}
                          className="custom-btn"
                        >
                          Novo usuário
                        </Button>
                      )}
                      {!listaUsuarios && (
                        <Skeleton
                          width={200}
                          height={43}
                          variant="rectangular"
                          sx={{ borderRadius: "1.375rem" }}
                        />
                      )}
                    </ThemeBtn>
                  </div>
                </div>
              </div>
              {!listaUsuarios && <TableUsuariosSkeleton />}
              {listaUsuarios && (
                <TableUsuarios
                  listaUsuariosProp={
                    listaUsuarios !== null ? listaUsuarios : []
                  }
                />
              )}
            </blockquote>
          </div>
        </div>
      </main>
      <Footer />
      {open && (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={true}
          >
            {exibirLoadDialog && <LinearLoad />}
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {operacaoAtual === 0
                ? "Cadastrar usuário"
                : operacaoAtual === 1
                ? "Atualizar usuário"
                : "Apagar usuário"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            {exibirLoadDialog && <div className="overlay-dialog"></div>}
            <DialogContent dividers>
              {cadastrarOuAtualizarUsuarioDialog && (
                <div className="cadastrarOuAtualizarUsuarioDialog">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="Primeiro nome"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.firstName}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
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
                            type="text"
                            label="Sobrenome"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.lastName}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
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
                            type="email"
                            label="E-mail"
                            error={emailRepetidoError !== "" ? true : false}
                            helperText={emailRepetidoError}
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.email}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  {cadastrarOuAtualizarUsuario === 0 && (
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-3">
                          <ThemeBtn>
                            <TextField
                              type="password"
                              label="Senha"
                              autoComplete="false"
                              variant="outlined"
                              sx={{ textTransform: "none" }}
                              fullWidth
                              value={dadosUsuarioCadastrar.password}
                              onChange={(e) => {
                                setDadosUsuarioCadastrar((prevState) => ({
                                  ...prevState,
                                  password: e.target.value,
                                }));
                              }}
                              disabled={exibirLoadDialog}
                            />
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="pt-br"
                          >
                            <DatePicker
                              fullWidth
                              label="Data de nasc."
                              onChange={(e) => {
                                setDadosUsuarioCadastrar((prevState) => ({
                                  ...prevState,
                                  birthDate: new Date(e).toJSON(),
                                }));
                              }}
                              defaultValue={
                                dadosUsuarioCadastrar.birthDate
                                  ? dayjs(dadosUsuarioCadastrar.birthDate)
                                  : null
                              }
                              disabled={exibirLoadDialog}
                            />
                          </LocalizationProvider>
                        </ThemeBtn>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn fullWidth>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="gender-select-label">
                                Gênero
                              </InputLabel>
                              <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={dadosUsuarioCadastrar.gender}
                                label="Gênero"
                                onChange={(e) => {
                                  setDadosUsuarioCadastrar((prevState) => ({
                                    ...prevState,
                                    gender: e.target.value,
                                  }));
                                }}
                                disabled={exibirLoadDialog}
                              >
                                <MenuItem value={"M"}>Masculino</MenuItem>
                                <MenuItem value={"F"}>Feminino</MenuItem>
                                <MenuItem value={"E"}>Outro</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="País"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.country}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                country: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="Cidade"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.city}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="Estado"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosUsuarioCadastrar.state}
                            onChange={(e) => {
                              setDadosUsuarioCadastrar((prevState) => ({
                                ...prevState,
                                state: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  <DialogActions>
                    <div className="row justify-content-center">
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <ThemeBtn>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none", width: "150px" }}
                              fullWidth
                              onClick={() => {
                                setCadastrarOuAtualizarUsuarioDialog(false);
                                setConfirmarCadastrarAtualizarOuApagarUsuarioDialog(
                                  true
                                );
                              }}
                              disabled={exibirLoadDialog || !dadosValidados}
                            >
                              {cadastrarOuAtualizarUsuario === 0
                                ? "Cadastrar"
                                : "Atualizar"}
                            </Button>
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              )}
              {confirmarCadastrarAtualizarOuApagarUsuarioDialog && (
                <div className="confirmarCadastrarAtualizarOuApagarUsuarioDialog">
                  <div className="row justify-content-center">
                    <div className="my-2">
                      <h5 className="text-center">
                        Você deseja realmente{" "}
                        {operacaoAtual === 0
                          ? "adicionar um novo"
                          : operacaoAtual === 1
                          ? "atualizar este"
                          : "apagar este"}{" "}
                        usuário?
                      </h5>
                    </div>
                  </div>
                  <DialogActions sx={{ justifyContent: "center" }}>
                    <div className="row justify-content-center">
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <ThemeBtn>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none", width: "150px" }}
                              fullWidth
                              onClick={() => {
                                operacaoAtual === 0
                                  ? cadastrarUsuario()
                                  : operacaoAtual === 1
                                  ? atualizarUsuario()
                                  : apagarUsuario();
                              }}
                            >
                              Sim
                            </Button>
                          </ThemeBtn>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <ThemeBtn>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none", width: "150px" }}
                              fullWidth
                              onClick={() => {
                                setConfirmarCadastrarAtualizarOuApagarUsuarioDialog(
                                  false
                                );
                                if (
                                  operacaoAtual === 0 ||
                                  operacaoAtual === 1
                                ) {
                                  setCadastrarOuAtualizarUsuarioDialog(true);
                                } else if (operacaoAtual === 2) {
                                  closeDialog();
                                }
                              }}
                            >
                              Não
                            </Button>
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              )}
            </DialogContent>
          </BootstrapDialog>
        </React.Fragment>
      )}
    </div>
  );
}
