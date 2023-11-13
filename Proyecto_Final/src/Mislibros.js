import React, { useState, useEffect } from 'react';
import './Mislibros.css';
import { Link, useParams } from 'react-router-dom';

function MisLibros() {
  const { userId } = useParams();
  const [misLibros, setMisLibros] = useState([]);

  useEffect(() => {
    const fetchMisLibros = async () => {
      try {
        const response = await fetch(`http://localhost:4000/libro/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMisLibros(data);
        } else if (response.status === 404) {
          console.log('No hay libros para el usuario');
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMisLibros();
  }, [userId]);


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
                <Link to={`/editar-libro/${libro.Id}`}>Editar</Link>
 
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to={`/agregar-libro/${userId}`} className="link-volver">
        Agregar Libro
      </Link>
      <Link to="/home" className="link-volver">Volver a Tabla Libros</Link>
    </div>
  );
}

export default MisLibros;
