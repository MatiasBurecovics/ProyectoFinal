import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './IniciarSesion.css'; 

function IniciarSesion() {
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        alert('Inicio de sesión exitoso');
        setIsLoggedIn(true);
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Correo Electrónico:</label>
        <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <button onClick={handleIniciarSesion}>Iniciar Sesión</button>
    </div>
  );
}

export default IniciarSesion;
