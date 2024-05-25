import React, { useState, useEffect } from "react";
import HeaderSidebar from "../components/HeaderSidebar";
import CardPage from "../components/CardPage";
import AlterarTitlePagina from "../services/AlterarTitlePagina";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Home() {
  useEffect(() => {
    if (location.pathname === "/") {
      history.pushState(null, null, "/home");
    }
    AlterarTitlePagina("");
  }, []);

  return (
    <div className="god">
      <Header />
      <main className="content-page">
        <Navbar />
        <div className="card card-page m-2">
          <div className="card-header">
            <h4 className="m-2">Página Inicial</h4>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0"></blockquote>
          </div>
        </div>
      </main>
    </div>
  );
}
