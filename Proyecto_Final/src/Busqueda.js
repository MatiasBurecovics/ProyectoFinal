import React from 'react';

function Busqueda(props) {
  const { searchTerm, searchFields, handleSearchTerm, handleToggleSearchField, handleSearch } = props;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const selectedFields = searchFields.length > 0 ? searchFields : ['titulo'];

    const searchTermLower = searchTerm.toLowerCase();

    const selectedFieldsLower = selectedFields.map(field => field.toLowerCase());

    handleSearch(searchTermLower, selectedFieldsLower);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Término de búsqueda"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
        <label>
          <input
            type="checkbox"
            checked={searchFields.includes('titulo')}
            onChange={() => handleToggleSearchField('titulo')}
          />
          Título
        </label>
        <label>
          <input
            type="checkbox"
            checked={searchFields.includes('autor')}
            onChange={() => handleToggleSearchField('autor')}
          />
          Autor
        </label>
        <label>
          <input
            type="checkbox"
            checked={searchFields.includes('materia')}
            onChange={() => handleToggleSearchField('materia')}
          />
          Materia
        </label>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Busqueda;
