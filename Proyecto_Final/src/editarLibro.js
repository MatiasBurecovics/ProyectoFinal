import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function EditarLibro() {

  
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  
  const [libro, setLibro] = useState({
    foto: '',
    titulo: '',
    autor: '',
    materia: '',
    editorial: '',
    descripcion: '',
    condicion: false,
    buscoOVendo: false,
    precio: 0,
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLibro((prevLibro) => ({
      ...prevLibro,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:4000/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libro),
    });
  
    if (response.ok) {
      alert('Libro actualizado con éxito');
    } 
  };
  return (
    <div>
      <h1>Editar libro</h1>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="foto"
          value={libro.foto}
          onChange={handleChange}
          placeholder="Foto"
        />

        <input
          type="text"
          name="titulo"
          value={libro.titulo}
          onChange={handleChange}
          placeholder="Título"
        />

        <input
          type="text"
          name="autor"
          value={libro.autor}
          onChange={handleChange}
          placeholder="Autor"
        />

        <input
          type="text"
          name="materia"
          value={libro.materia}
          onChange={handleChange}
          placeholder="Materia"
        />

        <input
          type="text"
          name="editorial"
          value={libro.editorial}
          onChange={handleChange}
          placeholder="Editorial"
        />

        <input
          type="text"
          name="descripcion"
          value={libro.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />

        <input
          type="checkbox"
          name="condicion"
          checked={libro.condicion}
          onChange={handleChange}
        />
        <label htmlFor="condicion">Bueno</label>

        <input
          type="checkbox"
          name="buscoOVendo"
          checked={libro.buscoOVendo}
          onChange={handleChange}
        />
        <label htmlFor="buscoOVendo">Busco</label>

        <input
          type="number"
          name="precio"
          value={libro.precio}
          onChange={handleChange}
          placeholder="Precio"
          min={0}
        />

        <button type="submit">Actualizar libro</button>
      </form>
    </div>
  );
}
