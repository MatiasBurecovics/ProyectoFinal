import React from 'react';
import { Link } from 'react-router-dom';
import './PantallaInicio.css'; 

function PantallaInicio() {
  return (
    <div className="home-container">
      <div className="logo">
        <img src="LOGO.PNG" alt="Logo" />
      </div>
      <div className="buttons">
        <Link to="/registro">
          <button>Registrarse</button>
        </Link>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default PantallaInicio;
