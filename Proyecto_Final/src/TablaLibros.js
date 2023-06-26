import React, { useState } from 'react';


const ListadoLibros = ({libros}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchField = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/libros?${searchField}=${searchTerm.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCards = () => {
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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar por término"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
        <select value={searchField} onChange={handleSearchField}>
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
          <option value="editorial">Editorial</option>
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div>{renderCards()}</div>
    </div>
  );
};

export default ListadoLibros;
