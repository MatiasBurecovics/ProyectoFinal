import React from 'react';
import './DetalleLibro.css';
import { Link } from 'react-router-dom';

const DetalleLibro = ({ libroId, libros}) => {
  const libro = libros.find((libro) => libro.id === libroId);

  if (!libro) {
    return <p>Libro no encontrado</p>;
  }

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
      <Link to="/">Volver a la lista de libros</Link>
      <Link to="/mis-libros">Mis Libros</Link>
    </div>
  );
};


export default DetalleLibro;
