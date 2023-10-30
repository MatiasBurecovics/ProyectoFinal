import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [mail, setMail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sede, setSede] = useState('');
  const [foto, setFoto] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleRegistro = async () => {
    try {
      const reader = new FileReader();

      reader.onload = async function (event) {
        const base64Image = event.target.result;

        const response = await fetch('http://localhost:4000/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail,
            nombre,
            apellido,
            sede,
            foto: base64Image,
            contraseña,
          }),
        });

        if (response.status === 201) {
          alert('Registro exitoso');
        } else {
          alert('Hubo un error durante el registro');
        }
      };

      reader.readAsDataURL(foto);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registro</h2>
      <div>
        <label>Mail:</label>
        <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      </div>
      <div>
        <label>Sede:</label>
        <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
      </div>
      <div>
        <label>Foto:</label>
        <input type="file" accept="image/*" onChange={handleFotoChange} />
        {previewImage && <img src={previewImage} alt="Vista previa de la imagen" className="preview-image" />}
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <button onClick={handleRegistro}>Registrarse</button>
      <Link to="/login">
        <button>Ir a iniciar sesion</button>
      </Link>
    </div>
  );
}

export default Registro;
