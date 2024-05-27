import React, { useState, useEffect } from "react";
import AlterarTitlePagina from "../services/AlterarTitlePagina";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { api } from "../services/ApiAxios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, LinearProgress } from "@mui/material";
import ThemeBtn from "../components/ThemeBtn";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions, Skeleton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import TooltipCustom from "../components/TooltipCustom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ClassesInformacoes() {
  useEffect(() => {
    AlterarTitlePagina("Classes de Informações");
    buscarTodosTiposDispositivo();
    buscarTodasMemoriasRam();
    buscarTodasMemoriasVram();
  }, []);

  const SkeletonMuiList = () => {
    return (
      <div className="skeleton-container">
        <Skeleton
          variant="circular"
          height="40px"
          width="40px"
          sx={{ marginLeft: "10px", marginBottom: "1rem" }}
        ></Skeleton>
        <Skeleton
          height="150px"
          width="240px"
          variant="rounded"
          sx={{ borderRadius: "8px" }}
        ></Skeleton>
      </div>
    );
  };

  const [tiposDispositivo, setTiposDispositivo] = useState(null);
  const [tiposRam, setTiposRam] = useState(null);
  const [tiposVram, setTiposVram] = useState(null);

  const buscarTodosTiposDispositivo = async () => {
    api
      .get("/dispositivos/tipos")
      .then((response) => {
        if (response.status === 200) {
          setTiposDispositivo(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao buscar a lista de tipos de dispositivo.");
      });
  };

  const buscarTodasMemoriasRam = async () => {
    api
      .get("/ram/tipos")
      .then((response) => {
        if (response.status === 200) {
          setTiposRam(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao buscar a lista de tipos de memória RAM.");
      });
  };

  const buscarTodasMemoriasVram = async () => {
    api
      .get("/vram/tipos")
      .then((response) => {
        if (response.status === 200) {
          setTiposVram(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao buscar a lista de tipos de memória VRAM.");
      });
  };

  const [cardPaginaAtual, setCardPaginaAtual] = useState(0); //0 - tipos de dispositivos, 1 - tipos de memórias RAM e VRAM

  function ListaItem(id, nome, arrayItem, desc) {
    return (
      arrayItem &&
      arrayItem.map((tipo) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          key={tipo[id]}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LabelImportantIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={tipo[nome]} secondary={desc} />
            <div className="btn-action-container ms-5">
              <TooltipCustom title="Apagar item">
                <button
                  className="btn botao table-btn"
                  onClick={() => {
                    setOperacaoAtual(2);
                    setIdItemAtual(tipo[id]);
                    openDialog(setConfirmarCadastrarApagarItemDialog);
                  }}
                >
                  <DeleteIcon />
                </button>
              </TooltipCustom>
            </div>
          </ListItem>
        </List>
      ))
    );
  }

  const [open, setOpen] = useState(false); //Estado para controlar se o modal está aberto ou fechado
  const openDialog = (callback) => {
    callback(true);
    setOpen(true);
  };
  const [cadastrarItemDialog, setCadastrarItemDialog] = useState(false);
  const [operacaoAtual, setOperacaoAtual] = useState(false);
  const [
    confirmarCadastrarApagarItemDialog,
    setConfirmarCadastrarApagarItemDialog,
  ] = useState(false);

  const handleClose = () => {
    closeDialog();
  };

  const closeDialog = () => {
    setOpen(false);
    setExibirLoadDialog(false);
    setConfirmarCadastrarApagarItemDialog(false);
    setCadastrarItemDialog(false);
    limparCampos();
  };

  const [tipoItemAtual, setTipoItemAtual] = useState(0); //0 - dispositivo, 1 - RAM, 2 - VRAM

  const verificarTipoItemAtual = () => {
    if (cardPaginaAtual === 0) {
      setTipoItemAtual(0);
      return;
    } else if (cardPaginaAtual === 1 && ramOuVramCard === 0) {
      setTipoItemAtual(1);
      return;
    }
    setTipoItemAtual(2);
  };

  const limparCampos = () => {
    setIdItemAtual(null);
    setDadosTipoItemCadastrarAtualizar((prevState) => ({
      ...prevState,
      itemTypeDescription: "",
    }));
  };

  const [idItemAtual, setIdItemAtual] = useState(null);

  const [exibirLoadDialog, setExibirLoadDialog] = useState(false);

  const LinearLoad = () => {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }}>
        <ThemeBtn>
          <LinearProgress />
        </ThemeBtn>
      </Stack>
    );
  };

  const [dadosTipoItemCadastrarAtualizar, setDadosTipoItemCadastrarAtualizar] =
    useState({
      itemTypeDescription: "",
    });

  const adicionarTipoDispositivo = async () => {
    setExibirLoadDialog(true);
    await api
      .post(`/dispositivos/tipos/cadastrar`, dadosTipoItemCadastrarAtualizar)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Tipo de dispositivo adicionado com sucesso.");
          buscarTodosTiposDispositivo();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao adicionar este tipo de dispositivo.");
        closeDialog();
      });
  };

  const apagarTipoDispositivo = async () => {
    setExibirLoadDialog(true);
    await api
      .delete(`/dispositivos/tipos/deletar/${idItemAtual}`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Tipo de dispositivo apagado com sucesso.");
          buscarTodosTiposDispositivo();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao apagar este tipo de dispositivo.");
        closeDialog();
      });
  };

  const adicionarTipoRam = async () => {
    setExibirLoadDialog(true);
    await api
      .post(`/ram/tipos/cadastrar`, dadosTipoItemCadastrarAtualizar)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Tipo de memória RAM adicionado com sucesso.");
          buscarTodasMemoriasRam();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao adicionar este tipo de memória RAM.");
        closeDialog();
      });
  };

  const apagarTipoRam = async () => {
    setExibirLoadDialog(true);
    await api
      .delete(`/ram/tipos/deletar/${idItemAtual}`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Tipo de memória RAM apagado com sucesso.");
          buscarTodasMemoriasRam();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao apagar este tipo de memória RAM.");
        closeDialog();
      });
  };

  const adicionarTipoVram = async () => {
    setExibirLoadDialog(true);
    await api
      .post(`/vram/tipos/cadastrar`, dadosTipoItemCadastrarAtualizar)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Tipo de memória VRAM adicionado com sucesso.");
          buscarTodasMemoriasVram();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao adicionar este tipo de memória VRAM.");
        closeDialog();
      });
  };

  const apagarTipoVram = async () => {
    setExibirLoadDialog(true);
    await api
      .delete(`/vram/tipos/deletar/${idItemAtual}`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Tipo de memória VRAM apagado com sucesso.");
          buscarTodasMemoriasVram();
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao apagar este tipo de memória VRAM.");
        closeDialog();
      });
  };

  const [ramOuVramCard, setRamOuVramCard] = useState(0);

  useEffect(() => {
    verificarTipoItemAtual();
  }, [cardPaginaAtual, ramOuVramCard]);

  return (
    <div className="god">
      <Header />
      <ToastContainer />
      <main className="content-page">
        <Navbar />
        <div className="card text-center card-page m-2">
          <div className="card-header">
            <h4 className="m-2 text-start">Classes de Informações</h4>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <div
                  className={
                    "nav-link" + (cardPaginaAtual === 0 ? " active" : "")
                  }
                  onClick={() => setCardPaginaAtual(0)}
                >
                  Tipos de Dispositivos
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    "nav-link" + (cardPaginaAtual === 1 ? " active" : "")
                  }
                  onClick={() => setCardPaginaAtual(1)}
                >
                  Tipos de Memórias
                </div>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              {(!tiposDispositivo || !tiposRam || !tiposVram) && (
                <SkeletonMuiList />
              )}
              {tiposDispositivo &&
                tiposRam &&
                tiposVram &&
                cardPaginaAtual === 0 && (
                  <div className="lista-disp-container">
                    <div className="btn-action-container">
                      <div className="row" style={{ paddingLeft: "16px" }}>
                        <div className="col-sm-auto">
                          <div className="mb-1">
                            <TooltipCustom title="Adicionar novo item">
                              <button
                                className="btn botao table-btn"
                                onClick={() => {
                                  setOperacaoAtual(0);
                                  openDialog(setCadastrarItemDialog);
                                }}
                              >
                                <AddIcon />
                              </button>
                            </TooltipCustom>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="custom-mui-list">
                      {ListaItem(
                        "id",
                        "type_disp",
                        tiposDispositivo,
                        "Dispositivo"
                      )}
                    </div>
                  </div>
                )}
              {tiposDispositivo &&
                tiposRam &&
                tiposVram &&
                cardPaginaAtual === 1 && (
                  <div className="lista-ram-container">
                    <div className="row" style={{ paddingLeft: "16px" }}>
                      <div className="col-sm-auto">
                        <div className="mb-1">
                          <ThemeBtn>
                            <FormControl>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ramOuVramCard}
                                onChange={(e) => {
                                  setRamOuVramCard(parseInt(e.target.value));
                                }}
                              >
                                <FormControlLabel
                                  value="0"
                                  control={<Radio />}
                                  label="RAM"
                                />
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label="VRAM"
                                />
                              </RadioGroup>
                            </FormControl>
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                    <div className="btn-action-container">
                      <div className="row" style={{ paddingLeft: "16px" }}>
                        <div className="col-sm-auto">
                          <div className="mb-1">
                            <TooltipCustom title="Adicionar novo item">
                              <button
                                className="btn botao table-btn"
                                onClick={() => {
                                  setOperacaoAtual(0);
                                  openDialog(setCadastrarItemDialog);
                                }}
                              >
                                <AddIcon />
                              </button>
                            </TooltipCustom>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="custom-mui-list">
                      {ListaItem(
                        "id",
                        "type_name",
                        ramOuVramCard === 0 ? tiposRam : tiposVram,
                        ramOuVramCard === 0 ? "Memória RAM" : "Memória VRAM"
                      )}
                    </div>
                  </div>
                )}
            </blockquote>
          </div>
        </div>
      </main>
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
                ? "Adicionar item"
                : operacaoAtual === 1
                ? "Atualizar item"
                : "Apagar item"}
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
              {cadastrarItemDialog && (
                <div className="cadastrarItemDialog">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <ThemeBtn>
                          <TextField
                            type="text"
                            label="Nome item"
                            autoComplete="false"
                            variant="outlined"
                            value={
                              dadosTipoItemCadastrarAtualizar.itemTypeDescription
                            }
                            sx={{ textTransform: "none" }}
                            fullWidth
                            onChange={(e) => {
                              setDadosTipoItemCadastrarAtualizar(
                                (prevState) => ({
                                  ...prevState,
                                  itemTypeDescription: e.target.value,
                                })
                              );
                            }}
                          />
                        </ThemeBtn>
                      </div>
                    </div>
                  </div>
                  <DialogActions sx={{ justifyContent: "end" }}>
                    <div className="row">
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <ThemeBtn>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none", width: "150px" }}
                              fullWidth
                              onClick={() => {
                                setCadastrarItemDialog(false);
                                setConfirmarCadastrarApagarItemDialog(true);
                              }}
                              disabled={
                                !dadosTipoItemCadastrarAtualizar.itemTypeDescription ||
                                dadosTipoItemCadastrarAtualizar.itemTypeDescription.trim()
                                  .length <= 0
                                  ? true
                                  : false
                              }
                            >
                              Adicionar
                            </Button>
                          </ThemeBtn>
                        </div>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              )}
              {confirmarCadastrarApagarItemDialog && (
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
                        item?
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
                                if (tipoItemAtual === 0) {
                                  if (operacaoAtual === 0) {
                                    adicionarTipoDispositivo();
                                  } else if (operacaoAtual === 2) {
                                    apagarTipoDispositivo();
                                  }
                                } else if (tipoItemAtual === 1) {
                                  if (operacaoAtual === 0) {
                                    adicionarTipoRam();
                                  } else if (operacaoAtual === 2) {
                                    apagarTipoRam();
                                  }
                                } else if (tipoItemAtual === 2) {
                                  if (operacaoAtual === 0) {
                                    adicionarTipoVram();
                                  } else if (operacaoAtual === 2) {
                                    apagarTipoVram();
                                  }
                                }
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
                                if (operacaoAtual === 0) {
                                  setConfirmarCadastrarApagarItemDialog(false);
                                  setCadastrarItemDialog(true);
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
