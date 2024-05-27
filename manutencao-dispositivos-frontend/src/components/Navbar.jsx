import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import { Button } from "@mui/material";
import SdCardIcon from "@mui/icons-material/SdCard";
import HandymanIcon from "@mui/icons-material/Handyman";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="anchor-container">
        <div className="anchor-btn-container">
          <Button
            fullWidth
            className="anchor-btn"
            onClick={() => navigate("/home")}
          >
            <HomeIcon /> Página Inicial
          </Button>
        </div>
        <div className="anchor-btn-container">
          <Button
            fullWidth
            className="anchor-btn"
            onClick={() => navigate("/manutencoesdispositivos")}
          >
            <HandymanIcon /> Manut. de Dispositivos
          </Button>
        </div>
        <div className="collapse-container-cadastros">
          <div
            className="anchor-btn-container"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCadastros"
            aria-expanded={
              location.pathname === "/dispositivos" ||
              location.pathname === "/classesinformacoes"
                ? "true"
                : "false"
            }
            aria-controls="collapseCadastros"
          >
            <Button fullWidth className="anchor-btn">
              <PlaylistAddIcon /> Cadastros
            </Button>
          </div>
          <div
            className={
              "collapse" +
              (location.pathname === "/dispositivos" ||
              location.pathname === "/classesinformacoes"
                ? " show"
                : "")
            }
            id="collapseCadastros"
          >
            <div className="anchor-btn-container ms-2">
              <Button
                fullWidth
                className="anchor-btn"
                onClick={() => navigate("/dispositivos")}
              >
                <DevicesIcon /> Dispositivos
              </Button>
            </div>
            <div className="anchor-btn-container ms-2">
              <Button
                fullWidth
                className="anchor-btn"
                onClick={() => navigate("/classesinformacoes")}
              >
                <SdCardIcon /> Classes de Info.
              </Button>
            </div>
          </div>
        </div>
        <div className="anchor-btn-container">
          <Button
            fullWidth
            className="anchor-btn"
            onClick={() => navigate("/usuarios")}
          >
            <GroupIcon /> Usuários
          </Button>
        </div>
      </div>
    </div>
  );
}
