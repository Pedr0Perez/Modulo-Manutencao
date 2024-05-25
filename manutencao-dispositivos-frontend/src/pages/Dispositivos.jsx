import React, { useState, useEffect } from "react";
import HeaderSidebar from "../components/HeaderSidebar";
import CardPage from "../components/CardPage";
import AlterarTitlePagina from "../services/AlterarTitlePagina";
import TextField from "@mui/material/TextField";
import ThemeBtn from "../components/ThemeBtn";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const emails = ["username@gmail.com", "user02@gmail.com"];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [teste, setTeste] = useState("");

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
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
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="row">
              <div className="col-sm-12">
                <ThemeBtn>
                  <TextField
                    type="text"
                    label="Teste"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    value={teste}
                    onChange={(e) => {
                      setTeste(e.target.value);
                    }}
                  />
                </ThemeBtn>
              </div>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
  0;
}

export default function Dispositivos() {
  useEffect(() => {
    AlterarTitlePagina("Dispositivos");
  }, []);

  return (
    <div className="god">
      <Header />
      <main className="content-page">
        <Navbar />
        <div className="card card-page m-2">
          <div className="card-header">
            <h4 className="m-2">Dispositivos</h4>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <CustomizedDialogs />
            </blockquote>
          </div>
        </div>
      </main>
    </div>
  );
}
