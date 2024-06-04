import React from "react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="version-container">
        <small>
          <p className="mb-0 text-gray">Alpha 1.0.0</p>
          <p className="mb-0 text-gray">Módulo de Manutenções</p>
        </small>
      </div>
      <div className="version-container">
        <small>
          <p className="mb-0 text-gray">&copy; 2024 Pedro Perez</p>
        </small>
      </div>
    </footer>
  );
}
