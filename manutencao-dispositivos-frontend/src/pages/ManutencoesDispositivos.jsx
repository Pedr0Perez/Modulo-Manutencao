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
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TableDispositivosSkeleton from "../components/DispositivosPage/TableDispositivosSkeleton";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ManutencoesDispositivos() {
  const [dadosManutencaoEnviar, setDadosManutencaoEnviar] = useState({
    deviceId: null,
    description: "",
  });
  useEffect(() => {
    setDadosValidados(validarDados());
  }, [dadosManutencaoEnviar]);

  const validarDados = () => {
    let validar = true;

    if (
      dadosManutencaoEnviar["description"] === "" ||
      dadosManutencaoEnviar["description"] === null ||
      dadosManutencaoEnviar["description"].trim().length <= 0
    ) {
      validar = false;
    }

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
    setAbrirOuAtualizarManutencaoDialog(false);
    setConfirmarAbrirAtualizarOuApagarManutencaoDialog(false);
    limparEstadoDadosUsuario();
  };

  const [operacaoAtual, setOperacaoAtual] = useState(null);

  const [
    abrirOuAtualizarManutencaoDialog,
    setAbrirOuAtualizarManutencaoDialog,
  ] = useState(false);

  const [
    confirmarAbrirAtualizarOuApagarManutencaoDialog,
    setConfirmarAbrirAtualizarOuApagarManutencaoDialog,
  ] = useState(false);

  const [idDispAtual, setIdDispAtual] = useState(null);

  const [abrirOuAtualizarManutencao, setAbrirOuAtualizarManutencao] =
    useState(0); //0 para cadastrar dispositivo, 1 para atualizar dispositivo. Esse estado controla se o dialog que é compartilhado por ambas as funcionalidades

  const [dadosValidados, setDadosValidados] = useState(false);

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

  const limparEstadoDadosUsuario = () => {
    setIdDispAtual(null);
    setOperacaoAtual(null);
    setDadosManutencaoEnviar({
      deviceId: null,
      description: "",
    });
  };

  const converterData = (dataISO) => {
    // Divide a string em data e hora
    const [data, hora] = dataISO.split(" ");

    // Divide a data em ano, mês e dia
    const [ano, mes, dia] = data.split("-");

    // Divide a hora em horas, minutos, segundos e milissegundos
    const [horas, minutos] = hora.split(":");

    // Monta a string no novo formato
    const novaDataHora = `${dia}/${mes}/${ano} ${horas}h${minutos}`;

    return novaDataHora;
  };

  const [listaManutencoes, setListaManutencoes] = useState(null);
  const buscarListaManutencoes = async () => {
    api
      .get("/manutencoes")
      .then((response) => {
        setListaManutencoes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listaDispositivos, setListaDispositivos] = useState(null);
  const buscarListaDispositivos = async () => {
    api
      .get("/dispositivos")
      .then((response) => {
        setListaDispositivos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listaDispositivosIdAndName, setListaDispositivosIdAndName] = useState(
    {}
  );
  useEffect(() => {
    if (listaDispositivos) {
      listaDispositivos.forEach((disp) => {
        setListaDispositivosIdAndName((prevState) => ({
          ...prevState,
          [disp.id]: disp.disp_name,
        }));
      });
    }
  }, [listaDispositivos]);

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
  const [listaUsuariosIdAndName, setListaUsuariosIdAndName] = useState({});
  useEffect(() => {
    if (listaUsuarios) {
      listaUsuarios.forEach((disp) => {
        setListaUsuariosIdAndName((prevState) => ({
          ...prevState,
          [disp.id]: disp.firstName + " " + disp.lastName,
        }));
      });
    }
  }, [listaUsuarios]);

  useEffect(() => {
    AlterarTitlePagina("Manutenções de Dispositivos");
    buscarListaManutencoes();
    limparEstadoDadosUsuario();
    buscarListaDispositivos();
    buscarTodosUsuarios();
  }, []);

  const [listaManutencoesTabela, setListaManutencoesTabela] = useState([]);

  const TableDispositivos = ({ listaManutencoesProp }) => {
    useEffect(() => {
      if (
        listaManutencoesProp !== null &&
        typeof listaManutencoesProp !== "undefined"
      ) {
        setListaManutencoesTabela(listaManutencoesProp);
      }
    }, [listaManutencoesProp]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const paginatedRows = listaManutencoesTabela.slice(
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
                      <b>Código Manutenção</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Dispositivo</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Responsável</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Data de criação</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Data de finalização</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Descrição</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Status</b>
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
                        {row.manut_entry}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.disp_id
                          ? listaDispositivosIdAndName[row.disp_id]
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.user_id
                          ? listaUsuariosIdAndName[row.user_id]
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.date_create ? converterData(row.date_create) : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.date_ended ? converterData(row.date_ended) : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.it_ended === "N" ? "Aberta" : "Finalizada"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className="table-btn-container">
                          <TooltipCustom title="Atualizar manutenção">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdDispAtual(row.id);
                                setAbrirOuAtualizarManutencao(1);
                                setDadosManutencaoEnviar({
                                  deviceId: row.disp_id,
                                  description: row.description,
                                });
                                setOperacaoAtual(1);
                                openDialog(setAbrirOuAtualizarManutencaoDialog);
                              }}
                            >
                              <EditIcon />
                            </button>
                          </TooltipCustom>
                          <TooltipCustom title="Desativar manutenção">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdDispAtual(row.id);
                                setOperacaoAtual(2);
                                openDialog(
                                  setConfirmarAbrirAtualizarOuApagarManutencaoDialog
                                );
                              }}
                            >
                              <PowerSettingsNewIcon />
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
                count={Math.ceil(listaManutencoesTabela.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                size="large"
                disabled={listaManutencoesTabela.length <= rowsPerPage}
              />
            </Stack>
          </div>
        </div>
      </div>
    );
  };

  const abrirManutencao = async () => {
    setExibirLoadDialog(true);
    await api
      .post("/manutencoes/abrir", dadosManutencaoEnviar)
      .then((response) => {
        if (response.status === 201) {
          closeDialog();
          toast.success("Manutenção aberta com sucesso.");
          buscarListaManutencoes();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao abrir a manutenção.");
      });
  };

  const atualizarManutencao = async () => {
    setExibirLoadDialog(true);
    await api
      .patch(`/manutencoes/atualizar/${idDispAtual}`, dadosManutencaoEnviar)
      .then((response) => {
        if (response.status === 200) {
          closeDialog();
          toast.success("Manutenção atualizada com sucesso.");
          buscarListaManutencoes();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao atualizar a manutenção.");
      });
  };

  const desativarManutencao = async () => {
    setExibirLoadDialog(true);
    await api
      .get(`/manutencoes/desativar/${idDispAtual}`)
      .then((response) => {
        if (response.status === 204) {
          closeDialog();
          toast.success("Manutenção desativada com sucesso.");
          buscarListaManutencoes();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao desativar a manutenção.");
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
            <h4 className="m-2">Manutenções de Dispositivos</h4>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <div className="row">
                <div className="col-sm-auto">
                  <div className="mb-3">
                    <ThemeBtn>
                      {listaManutencoes && (
                        <Button
                          variant="contained"
                          sx={{ textTransform: "none", width: "200px" }}
                          fullWidth
                          onClick={() => {
                            setOperacaoAtual(0);
                            setAbrirOuAtualizarManutencao(0);
                            openDialog(setAbrirOuAtualizarManutencaoDialog);
                          }}
                          className="custom-btn"
                        >
                          Abrir manutenção
                        </Button>
                      )}
                      {!listaManutencoes && (
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
              {!listaManutencoes && <TableDispositivosSkeleton />}
              {listaManutencoes && (
                <TableDispositivos
                  listaManutencoesProp={
                    listaManutencoes !== null ? listaManutencoes : []
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
                ? "Abrir manutenção"
                : operacaoAtual === 1
                ? "Atualizar manutenção"
                : "Cancelar manutenção"}
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
              {abrirOuAtualizarManutencaoDialog && (
                <div className="abrirOuAtualizarManutencaoDialog">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <ThemeBtn>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="disp-type-select-label">
                                Dispositivo
                              </InputLabel>
                              <Select
                                labelId="disp-type-select-label"
                                id="disp-type-select-label"
                                value={dadosManutencaoEnviar.deviceId ?? ""}
                                label="Dispositivo"
                                onChange={(e) => {
                                  setDadosManutencaoEnviar((prevState) => ({
                                    ...prevState,
                                    deviceId: e.target.value,
                                  }));
                                }}
                                disabled={exibirLoadDialog}
                              >
                                {listaDispositivos &&
                                  listaDispositivos.map((tipo, i) => (
                                    <MenuItem key={i} value={tipo.id}>
                                      {tipo.disp_name}
                                    </MenuItem>
                                  ))}
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
                            label="Descrição"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosManutencaoEnviar.description}
                            onChange={(e) => {
                              setDadosManutencaoEnviar((prevState) => ({
                                ...prevState,
                                description: e.target.value,
                              }));
                            }}
                            disabled={exibirLoadDialog}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  <DialogActions>
                    <div className="row justify-content-end">
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <ThemeBtn>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none", width: "150px" }}
                              fullWidth
                              onClick={() => {
                                setAbrirOuAtualizarManutencaoDialog(false);
                                setConfirmarAbrirAtualizarOuApagarManutencaoDialog(
                                  true
                                );
                              }}
                              disabled={exibirLoadDialog || !dadosValidados}
                            >
                              {abrirOuAtualizarManutencao === 0
                                ? "Abrir"
                                : "Atualizar"}
                            </Button>
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              )}
              {confirmarAbrirAtualizarOuApagarManutencaoDialog && (
                <div className="confirmarAbrirAtualizarOuApagarManutencaoDialog">
                  <div className="row justify-content-center">
                    <div className="my-2">
                      <h5 className="text-center">
                        Você deseja realmente{" "}
                        {operacaoAtual === 0
                          ? "abrir uma nova"
                          : operacaoAtual === 1
                          ? "atualizar esta"
                          : "cancelar esta"}{" "}
                        manutenção?
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
                                  ? abrirManutencao()
                                  : operacaoAtual === 1
                                  ? atualizarManutencao()
                                  : desativarManutencao();
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
                                setConfirmarAbrirAtualizarOuApagarManutencaoDialog(
                                  false
                                );
                                if (
                                  operacaoAtual === 0 ||
                                  operacaoAtual === 1
                                ) {
                                  setAbrirOuAtualizarManutencaoDialog(true);
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
