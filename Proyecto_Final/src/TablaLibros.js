import React from 'react';
import './TablaLibros.css';

const TablaLibros = ({ libros }) => {
 
  
  const renderCards = () => {
    if (libros.length === 0) {
      return  <div className="error-container">
      <p className="error-message">No se encontraron resultados</p>
    </div>
    }
    return libros.map((libro) => (
      <div className="card" style={{ width: '18rem' }} key={libro.titulo}>
        <img className="card-img-top" src={libro.foto} alt={libro.titulo} />
        <div className="card-body">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-text">Precio: {libro.precio}</p>
          <p className="card-text">
            Condición: {libro.condicion ? 'Nuevo' : 'Usado'}
          </p>
          <p className="card-text">
            Busco o Vendo: {libro.buscoOVendo ? 'Busco' : 'Vendo'}
          </p>
          <p className="card-text">Autor: {libro.autor}</p>
          <p className="card-text">Materia: {libro.materia}</p>
          <p className="card-text">Editorial: {libro.editorial}</p>
          <p className="card-text">Descripción: {libro.descripcion}</p>
        </div>
      </div>
    ));
  };

  return <div className="card-container">{renderCards()}</div>;
};

export default TablaLibros;