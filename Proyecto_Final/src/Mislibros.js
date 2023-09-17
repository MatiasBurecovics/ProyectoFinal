import React, { useState, useEffect } from 'react';
import './Mislibros.css' // Agrega estilos CSS personalizados
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

          // Filtra los libros del usuario simulado (usuario con ID 1)
          const librosUsuarioSimulado = data.filter((libro) => libro.IdUsuario === simulatedUserId);
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
      <table className="mis-libros-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editorial</th>
            <th>Materia</th>
            <th>Descripción</th>
            <th>Condición</th>
            <th>Busco o Vendo</th>
            <th>Precio</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {misLibros.map((libro) => (
            <tr key={libro.Id}>
              <td>
                <img
                  src={libro.foto}
                  alt={`Portada de ${libro.titulo}`}
                  className="libro-foto"
                />
              </td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.editorial}</td>
              <td>{libro.materia}</td>
              <td>{libro.descripcion}</td>
              <td>{libro.condicion ? 'Nuevo' : 'Usado'}</td>
      <td> {libro.buscoOVendo ? 'Busco' : 'Vendo'}</td>
              <td>{libro.precio}</td>
              <td>
              <Link to={`/editar-libro/${libro.Id}`}>Editar</Link>
                <Link to={`/detalle-libro/${libro.Id}`}>Ver detalles</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MisLibros;
