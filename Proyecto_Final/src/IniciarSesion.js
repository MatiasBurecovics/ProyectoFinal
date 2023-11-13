import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './IniciarSesion.css';

function IniciarSesion({ setUserId }) {
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserIdLocal] = useState(null);

  const handleIniciarSesion = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail,
          contraseña,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        alert('Inicio de sesión exitoso');
        setIsLoggedIn(true);
        setUserIdLocal(data.Id);
        setUserId(data.Id); 

      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="iniciar-sesion-container">
      <h2 className="iniciar-sesion-title">Iniciar Sesión</h2>
      <div>
        <label className="iniciar-sesion-label">Correo Electrónico:</label>
        <input
          className="iniciar-sesion-input"
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div>
        <label className="iniciar-sesion-label">Contraseña:</label>
        <input
          className="iniciar-sesion-input"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>
      <button className="iniciar-sesion-button" onClick={handleIniciarSesion}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default IniciarSesion;
