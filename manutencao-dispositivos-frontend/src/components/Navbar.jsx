import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import { Button } from "@mui/material";
import SdCardIcon from "@mui/icons-material/SdCard";

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
            onClick={() => navigate("/dispositivos")}
          >
            <DevicesIcon /> Dispositivos
          </Button>
        </div>
        <div
          className="anchor-btn-container"
          // data-bs-toggle="collapse"
          // data-bs-target="#collapseExample"
          // aria-expanded="false"
          // aria-controls="collapseExample"
        >
          <Button
            fullWidth
            className="anchor-btn"
            onClick={() => navigate("/classesinformacoes")}
          >
            <SdCardIcon /> Classes de Info.
          </Button>

          {/* <div class="collapse" id="collapseExample">
            <div className="anchor-btn-container ms-2">
              <Button
                fullWidth
                className="anchor-btn"
                onClick={() => navigate("/memorias/ram")}
              >
                <MemoryIcon /> Tipo Memórias
              </Button>
            </div>
            <div className="anchor-btn-container ms-2">
              <Button
                fullWidth
                className="anchor-btn"
                onClick={() => navigate("/memorias/vram")}
              >
                <MemoryIcon /> Tipo Dispositivos
              </Button>
            </div>
          </div> */}
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
