import React from 'react';
import './TablaLibros.css';

const TablaLibros = ({ libros ,  handleVerDetalles }) => {
  const renderCards = () => {
    if (libros.length === 0) {
      return (
        <div className="error-container">
          <p className="error-message">No se encontraron resultados</p>
        </div>
      );
    }
    return libros.map((libro) => (
      <div className="card" style={{ width: '18rem' }} key={libro.titulo}>
        <img className="card-img-top" src={libro.foto} alt={libro.titulo} />
        <div className="card-body">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-text">Precio: {libro.precio}</p>
          <p className="card-text">Id Usuario: {libro.IdUsuario}</p>
        </div>
        <button onClick={() => handleVerDetalles(libro)}>Ver detalles</button>
      </div>
    ));
  };

  return <div className="card-container">{renderCards()}</div>;

};

export default TablaLibros;
