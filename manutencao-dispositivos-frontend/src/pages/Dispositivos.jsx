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
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function Dispositivos() {
  const [dadosDispositivoCadastrar, setDadosDispositivoCadastrar] = useState({
    dispType: null,
    dispName: "",
    cpu: "",
    gpu: "",
    motherboard: "",
    psu: "",
    storage: null,
    ramQuantity: null,
    ramType: null,
    vramQuantity: null,
    vramType: null,
    note: "",
  });
  useEffect(() => {
    setDadosValidados(validarDados());
  }, [dadosDispositivoCadastrar]);

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

  const [
    cadastrarOuAtualizarUsuarioDialog,
    setCadastrarOuAtualizarUsuarioDialog,
  ] = useState(false);

  const [
    confirmarCadastrarAtualizarOuApagarUsuarioDialog,
    setConfirmarCadastrarAtualizarOuApagarUsuarioDialog,
  ] = useState(false);

  const [idDispAtual, setIdDispAtual] = useState(null);

  const [cadastrarOuAtualizarUsuario, setCadastrarOuAtualizarUsuario] =
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

  const validarDados = () => {
    let validar = true;

    const requiredInputs = ["dispType", "dispName"];

    dadosDispositivoCadastrar["dispName"].trim().length <= 0
      ? (validar = false)
      : null;

    requiredInputs.map((input) => {
      if (
        dadosDispositivoCadastrar[input] === "" ||
        dadosDispositivoCadastrar[input] === null
      ) {
        validar = false;
      }
    });

    return validar;
  };

  const limparEstadoDadosUsuario = () => {
    setIdDispAtual(null);
    setOperacaoAtual(null);
    setDadosDispositivoCadastrar({
      dispType: null,
      dispName: "",
      cpu: "",
      gpu: "",
      motherboard: "",
      psu: "",
      storage: null,
      ramQuantity: null,
      ramType: null,
      vramQuantity: null,
      vramType: null,
      note: "",
    });
  };

  const [listaDispositivos, setListaDispositivos] = useState(null);
  const buscarTodosUsuarios = async () => {
    api
      .get("/dispositivos")
      .then((response) => {
        setListaDispositivos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listaTiposDispositivo, setListaTiposDispositivo] = useState(null);
  const buscarTodosTiposDispositivos = async () => {
    api
      .get("/dispositivos/tipos")
      .then((response) => {
        setListaTiposDispositivo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listaTiposDispositivoIdAndName, setListaTiposDispositivoIdAndName] =
    useState({});
  useEffect(() => {
    if (listaTiposDispositivo) {
      listaTiposDispositivo.forEach((disp) => {
        setListaTiposDispositivoIdAndName((prevState) => ({
          ...prevState,
          [disp.id]: disp.type_disp,
        }));
      });
    }
  }, [listaTiposDispositivo]);

  const [listaTiposRam, setListaTiposRam] = useState(null);
  const buscarTodosTiposRam = async () => {
    api
      .get("/ram/tipos")
      .then((response) => {
        setListaTiposRam(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listaTiposRamIdAndName, setListaTiposRamIdAndName] = useState({});
  useEffect(() => {
    if (listaTiposRam) {
      listaTiposRam.forEach((disp) => {
        setListaTiposRamIdAndName((prevState) => ({
          ...prevState,
          [disp.id]: disp.type_name,
        }));
      });
    }
  }, [listaTiposRam]);

  const [listaTiposVram, setListaTiposVram] = useState(null);
  const buscarTodosTiposVram = async () => {
    api
      .get("/vram/tipos")
      .then((response) => {
        setListaTiposVram(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listaTiposVramIdAndName, setListaTiposVramIdAndName] = useState({});
  useEffect(() => {
    if (listaTiposVram) {
      listaTiposVram.forEach((disp) => {
        setListaTiposVramIdAndName((prevState) => ({
          ...prevState,
          [disp.id]: disp.type_name,
        }));
      });
    }
  }, [listaTiposVram]);

  useEffect(() => {
    AlterarTitlePagina("Dispositivos");
    buscarTodosUsuarios();
    buscarTodosTiposDispositivos();
    limparEstadoDadosUsuario();
    buscarTodosTiposRam();
    buscarTodosTiposVram();
  }, []);

  const [listaDispositivosTabela, setListaUsuariosTabela] = useState([]);

  const TableDispositivos = ({ listaDispositivosProp }) => {
    useEffect(() => {
      if (
        listaDispositivosProp !== null &&
        typeof listaDispositivosProp !== "undefined"
      ) {
        setListaUsuariosTabela(listaDispositivosProp);
      }
    }, [listaDispositivosProp]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const paginatedRows = listaDispositivosTabela.slice(
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
                      <b>Nome dispositivo</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Tipo</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>CPU</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>GPU</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Placa-mãe</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Memória RAM</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Memória VRAM</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Armazenamento</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Fonte</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Nota</b>
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
                        {row.disp_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {listaTiposDispositivoIdAndName[row.disp_type]}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.cpu ? row.cpu : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.gpu ? row.gpu : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.mb ? row.mb : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.ram_qtd
                          ? `${row.ram_qtd}GB ${
                              listaTiposRamIdAndName[row.ram_type]
                            }`
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.vram_qtd
                          ? `${row.vram_qtd}GB ${
                              listaTiposVramIdAndName[row.vram_type]
                            }`
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.storage ? row.storage : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.psu ? row.psu : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.note}</StyledTableCell>
                      <StyledTableCell align="left">
                        <div className="table-btn-container">
                          <TooltipCustom title="Atualizar dispositivo">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdDispAtual(row.id);
                                setCadastrarOuAtualizarUsuario(1);
                                setDadosDispositivoCadastrar({
                                  dispType: row.disp_type,
                                  dispName: row.disp_name,
                                  cpu: row.cpu,
                                  gpu: row.gpu,
                                  ramQuantity: row.ram_qtd,
                                  ramType: row.ram_type,
                                  vramQuantity: row.vram_qtd,
                                  vramType: row.vram_type,
                                  storage: row.storage,
                                  motherboard: row.mb,
                                  psu: row.psu,
                                  note: row.note,
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
                          <TooltipCustom title="Apagar dispositivo">
                            <button
                              className="btn botao table-btn"
                              onClick={() => {
                                setIdDispAtual(row.id);
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
                count={Math.ceil(listaDispositivosTabela.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                size="large"
                disabled={listaDispositivosTabela.length <= rowsPerPage}
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
      .post("/dispositivos/cadastrar", dadosDispositivoCadastrar)
      .then((response) => {
        if (response.status === 201) {
          closeDialog();
          toast.success("Dispositivo cadastrado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao cadastrar o dispositivo.");
      });
  };

  const atualizarUsuario = async () => {
    setExibirLoadDialog(true);
    await api
      .put(`/dispositivos/atualizar/${idDispAtual}`, dadosDispositivoCadastrar)
      .then((response) => {
        if (response.status === 200) {
          closeDialog();
          toast.success("Dispositivo atualizado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao atualizar o dispositivo.");
      });
  };

  const apagarUsuario = async () => {
    setExibirLoadDialog(true);
    await api
      .delete(`/dispositivos/deletar/${idDispAtual}`)
      .then((response) => {
        if (response.status === 204) {
          closeDialog();
          toast.success("Dispositivo apagado com sucesso.");
          buscarTodosUsuarios();
        }
      })
      .catch((error) => {
        console.error(error);
        closeDialog();
        toast.error("Falha ao apagar o dispositivo.");
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
            <h4 className="m-2">Dispositivos</h4>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <div className="row">
                <div className="col-sm-auto">
                  <div className="mb-3">
                    <ThemeBtn>
                      {listaDispositivos && (
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
                          Novo dispositivo
                        </Button>
                      )}
                      {!listaDispositivos && (
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
              {!listaDispositivos && <TableDispositivosSkeleton />}
              {listaDispositivos && (
                <TableDispositivos
                  listaDispositivosProp={
                    listaDispositivos !== null ? listaDispositivos : []
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
                ? "Cadastrar dispositivo"
                : operacaoAtual === 1
                ? "Atualizar dispositivo"
                : "Apagar dispositivo"}
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
                            label="Nome dispositivo"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.dispName}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                dispName: e.target.value,
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
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="disp-type-select-label">
                                Tipo dispositivo
                              </InputLabel>
                              <Select
                                labelId="disp-type-select-label"
                                id="disp-type-select-label"
                                value={dadosDispositivoCadastrar.dispType ?? ""}
                                label="Tipo dispositivo"
                                onChange={(e) => {
                                  setDadosDispositivoCadastrar((prevState) => ({
                                    ...prevState,
                                    dispType: e.target.value,
                                  }));
                                }}
                                disabled={exibirLoadDialog}
                              >
                                {listaTiposDispositivo &&
                                  listaTiposDispositivo.map((tipo, i) => (
                                    <MenuItem key={i} value={tipo.id}>
                                      {tipo.type_disp}
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
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="CPU"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.cpu}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                cpu: e.target.value,
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
                            label="GPU"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.gpu}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                gpu: e.target.value,
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
                            type="number"
                            label="Quant. Memória RAM"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.ramQuantity ?? ""}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                ramQuantity: e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
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
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="ram-type-select-label">
                                Tipo Memória RAM
                              </InputLabel>
                              <Select
                                labelId="ram-type-select-label"
                                id="ram-type-select-label"
                                value={dadosDispositivoCadastrar.ramType ?? ""}
                                label="Tipo Memória RAM"
                                onChange={(e) => {
                                  setDadosDispositivoCadastrar((prevState) => ({
                                    ...prevState,
                                    ramType: parseInt(e.target.value),
                                  }));
                                }}
                                disabled={exibirLoadDialog}
                              >
                                {listaTiposRam &&
                                  listaTiposRam.map((tipo, i) => (
                                    <MenuItem key={i} value={tipo.id}>
                                      {tipo.type_name}
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
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="number"
                            label="Quant. Memória VRAM"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.vramQuantity ?? ""}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                vramQuantity: e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
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
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="ram-type-select-label">
                                Tipo Memória VRAM
                              </InputLabel>
                              <Select
                                labelId="ram-type-select-label"
                                id="ram-type-select-label"
                                value={dadosDispositivoCadastrar.vramType ?? ""}
                                label="Tipo Memória VRAM"
                                onChange={(e) => {
                                  setDadosDispositivoCadastrar((prevState) => ({
                                    ...prevState,
                                    vramType: parseInt(e.target.value),
                                  }));
                                }}
                                disabled={exibirLoadDialog}
                              >
                                {listaTiposVram &&
                                  listaTiposVram.map((tipo, i) => (
                                    <MenuItem key={i} value={tipo.id}>
                                      {tipo.type_name}
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
                            type="number"
                            label="Armazenamento"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.storage ?? ""}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                storage: e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
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
                            label="Placa-mãe"
                            autoComplete="false"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.motherboard}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                motherboard: e.target.value,
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
                            label="Fonte"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.psu}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                psu: e.target.value,
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
                            label="Nota"
                            multiline
                            minRows={3}
                            maxRows={3}
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            fullWidth
                            value={dadosDispositivoCadastrar.note}
                            onChange={(e) => {
                              setDadosDispositivoCadastrar((prevState) => ({
                                ...prevState,
                                note: e.target.value,
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
                        dispositivo?
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
