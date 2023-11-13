import React, { useEffect, useState } from 'react';
import './DetalleLibro.css';
import { Link, useParams } from 'react-router-dom';

const DetalleLibro = () => {
  const { id: libroId } = useParams();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/${libroId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Libro no encontrado');
        }
      })
      .then((data) => {
        setLibro(data[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [libroId]);

  if (!libro) {
    return <p>Cargando...</p>;
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


      <Link to={`/chat/${libro.id}`}>
        <button>Ir al Chat</button>
      </Link>

      <Link to="/home" className="link">Volver a la lista de libros</Link>
    </div>
  );
};

export default DetalleLibro;
