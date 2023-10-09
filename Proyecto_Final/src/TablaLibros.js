import React from 'react';
import './TablaLibros.css';
import { Link } from 'react-router-dom';

const TablaLibros = ({ libros, usuarios }) => {
  const findUserNameById = (id) => {
    const usuario = usuarios[id];
    return usuario || 'Usuario no encontrado';
  };

  const renderCards = () => {
    if (libros.length === 0) {
      return (
        <div className="error-container">
          <p className="error-message">No se encontraron resultados</p>
        </div>
      );
    }
    return (
      
      <div>
        {libros.map((libro) => (
          <div className="card" style={{ width: '18rem' }} key={libro.titulo}>
            <img className="card-img-top" src={libro.foto} alt={libro.titulo} />
            <div className="card-body">
              <h5 className="card-title">{libro.titulo}</h5>
              <p className="card-text">Precio: {libro.precio}</p>
              <p className="card-text">Nombre del usuario: {findUserNameById(libro.IdUsuario)}</p>
            </div>
            <Link to={`/detalle-libro/${libro.Id}`} className="btn btn-primary">Ver detalles</Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card-container">
      {renderCards()}
      <div className="link-container">
        <Link to="/mis-libros" className="link">
          Mis Libros
        </Link>
      </div>
    </div>
  );
}

export default TablaLibros;
