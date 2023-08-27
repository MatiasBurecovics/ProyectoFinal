import React from 'react';
import './Busqueda.css';

const Busqueda = ({ searchTerm, searchFields, handleSearchTerm, handleToggleSearchField, handleSearch }) => {
  const handleCombinedSearch = () => {
    handleSearch(searchTerm, searchFields);
  };

  return (
    <div className="busqueda-container">
      <input
        className="busqueda-input"
        type="text"
        placeholder="Buscar por término"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
      <button className="busqueda-button" onClick={handleCombinedSearch}>
        Buscar
      </button>
      <div className="busqueda-checkboxes">
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