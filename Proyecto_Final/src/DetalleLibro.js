import React from 'react';
import './DetalleLibro.css';

const DetalleLibro = ({ libro, handleClose }) => {
  return (
    <div className="detalle-libro">
      <h2>Detalles del Libro</h2>
      <img src={libro.foto} alt={libro.titulo} />
      <h3>{libro.titulo}</h3>
      <p>Autor: {libro.autor}</p>
      <p>Materia: {libro.materia}</p>
      <p>Editorial: {libro.editorial}</p>
      <p>Descripción: {libro.descripcion}</p>
      <p>Precio: {libro.precio}</p>
      <p>Condición: {libro.condicion ? 'Nuevo' : 'Usado'}</p>
      <p>Busco o Vendo: {libro.buscoOVendo ? 'Busco' : 'Vendo'}</p>
      <button onClick={handleClose}>Cerrar</button>
    </div>
  );
};

export default DetalleLibro;
