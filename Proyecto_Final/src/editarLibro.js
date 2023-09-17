import React, { useState, useEffect } from 'react';

function EditarLibro({ libroId }) {
  const [libro, setLibro] = useState({
    foto: '',
    titulo: '',
    autor: '',
    materia: '',
    editorial: '',
    descripcion: '',
    condicion: 'Nuevo', // Valor por defecto para Condición
    buscoOVendo: 'Busco', // Valor por defecto para Busco o Vendo
    precio: 0,
  });

  useEffect(() => {
    const obtenerDetallesLibro = async () => {
      try {
        const response = await fetch(`http://localhost:4000/libros/${libroId}`);
        if (response.ok) {
          const data = await response.json();
          setLibro(data[0]);
        } else {
          console.error('Error al obtener detalles del libro:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    obtenerDetallesLibro();
  }, [libroId]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setLibro({
      ...libro,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/libros/${libroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libro),
      });

      if (response.ok) {
        console.log('Libro actualizado con éxito');
      } else {
        console.error('Error al actualizar el libro:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Editar Libro</h2>
      <form>
        <div>
          <label>Foto:</label>
          <input
            type="text"
            name="foto"
            value={libro.foto}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={libro.titulo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="autor"
            value={libro.autor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Materia:</label>
          <input
            type="text"
            name="materia"
            value={libro.materia}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Editorial:</label>
          <input
            type="text"
            name="editorial"
            value={libro.editorial}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={libro.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Condición:</label>
          <select
            name="condicion"
            value={libro.condicion}
            onChange={handleInputChange}
          >
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="Desgastado">Desgastado</option>
          </select>
        </div>
        <div>
          <label>Busco o Vendo:</label>
          <select
            name="buscoOVendo"
            value={libro.buscoOVendo}
            onChange={handleInputChange}
          >
            <option value="Busco">Busco</option>
            <option value="Vendo">Vendo</option>
          </select>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={libro.precio}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarLibro;
