import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import encryptjs from "encryptjs";
import TooltipCustom from "./TooltipCustom";

export default function MenuUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [nomeUsuario, setNomeUsuario] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("dataUser")) {
      return;
    }
    const encrypt = encryptjs;
    const secretKey = "sprintHannah2003";
    const dadosSessaoDescriptografados = encrypt.decrypt(
      localStorage.getItem("dataUser"),
      secretKey,
      256
    );
    const sessaoDados = JSON.parse(dadosSessaoDescriptografados);
    setNomeUsuario(sessaoDados.name);
  }, []);

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logOut = () => {
    deleteCookie("token");
    localStorage.removeItem("dataUser");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <TooltipCustom title="Minha conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {nomeUsuario[0] ? nomeUsuario[0] : ""}
            </Avatar>
          </IconButton>
        </TooltipCustom>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {nomeUsuario}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logOut();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
