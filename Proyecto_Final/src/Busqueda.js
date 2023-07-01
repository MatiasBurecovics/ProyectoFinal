import React from 'react';
import './Busqueda.css';

const Busqueda = ({ searchTerm, searchField, handleSearchTerm, handleSearchField, handleSearch }) => {
  return (
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
  );
};

export default Busqueda;