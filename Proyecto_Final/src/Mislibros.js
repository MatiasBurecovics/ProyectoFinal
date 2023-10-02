import React, { useState, useEffect } from 'react';
import './Mislibros.css';
import { Link } from 'react-router-dom';

function MisLibros() {
  const [misLibros, setMisLibros] = useState([]);
  const simulatedUserId = 1;

  useEffect(() => {
    const fetchMisLibros = async () => {
      try {
        const response = await fetch('http://localhost:4000/libros');
        if (response.ok) {
          const data = await response.json();
          const librosUsuarioSimulado = data.filter(
            (libro) => libro.IdUsuario === simulatedUserId
          );
          setMisLibros(librosUsuarioSimulado);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMisLibros();
  }, []);

  return (
    <div className="mis-libros-container">
      <h2>Mis Libros</h2>
      <div className="cards-container">
        {misLibros.map((libro) => (
          <div key={libro.Id} className="libro-card">
            <img
              src={libro.foto}
              alt={`Portada de ${libro.titulo}`}
              className="libro-foto"
            />
            <div className="libro-info">
              <h3>{libro.titulo}</h3>
              <p>Autor: {libro.autor}</p>
              <p>Editorial: {libro.editorial}</p>
              <p>Materia: {libro.materia}</p>
              <p>Descripción: {libro.descripcion}</p>
              <p>Condición: {libro.condicion ? 'Nuevo' : 'Usado'}</p>
              <p>Busco o Vendo: {libro.buscoOVendo ? 'Busco' : 'Vendo'}</p>
              <p>Precio: {libro.precio}</p>
              <div className="libro-actions">
                <Link to={`/agregar-libro/${libro.Id}`}>Editar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="link-volver">Volver a Tabla Libros</Link>
    </div>
  );
}

export default MisLibros;
