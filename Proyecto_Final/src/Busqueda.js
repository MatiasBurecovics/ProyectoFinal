import React, { useState } from 'react';
import './Busqueda.css';

const Busqueda = ({
  searchTerm,
  searchFields,
  handleSearchTerm,
  handleToggleSearchField,
  handleSearch,
}) => {
  const handleCombinedSearch = () => {
    handleSearch(searchTerm, searchFields);
  };

  const [universalSearchTerm, setUniversalSearchTerm] = useState('');

  const handleUniversalSearch = () => {
    handleSearch(universalSearchTerm, [
      'titulo',
      'autor',
      'editorial',
      'condicion',
      'precio',
      'descripcion',
      'buscoOVendo',
    ]);
  };

  return (
    <div className="busqueda-container">
      <div className="universal-search">
        <input
          type="text"
          placeholder="Búsqueda Universal"
          value={universalSearchTerm}
          onChange={(e) => setUniversalSearchTerm(e.target.value)}
        />
        <button className="universal-search-button" onClick={handleUniversalSearch}>
          Buscar Universal
        </button>
      </div>
      <div className="term-search">
        <input
          className="busqueda-input"
          type="text"
          placeholder="Buscar por término"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
        <button className="term-search-button" onClick={handleCombinedSearch}>
          Buscar
        </button>
      </div>
      <div className="search-fields">
        <label className="busqueda-label">
          <input
            className="busqueda-checkbox"
            type="checkbox"
            value="titulo"
            checked={searchFields.includes('titulo')}
            onChange={() => handleToggleSearchField('titulo')}
          />
          Título
        </label>
        <label className="busqueda-label">
          <input
            className="busqueda-checkbox"
            type="checkbox"
            value="autor"
            checked={searchFields.includes('autor')}
            onChange={() => handleToggleSearchField('autor')}
          />
          Autor
        </label>
        <label className="busqueda-label">
          <input
            className="busqueda-checkbox"
            type="checkbox"
            value="editorial"
            checked={searchFields.includes('editorial')}
            onChange={() => handleToggleSearchField('editorial')}
          />
          Editorial
        </label>
      </div>
    </div>
  );
};

export default Busqueda;
