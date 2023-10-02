import React from 'react';

function Busqueda(props) {
  const {
    searchTerm,
    searchFields,
    handleSearchTerm,
    handleToggleSearchField,
    handleSearch,
    filtroBuscoOVendo,
    setFiltroBuscoOVendo,
  } = props;

  const handleFiltroBuscoOVendoChange = (e) => {
    const value = e.target.value;
    // Convertir el valor seleccionado a booleano
    const buscoOVendo = value === 'true';

    setFiltroBuscoOVendo(buscoOVendo);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm, searchFields, filtroBuscoOVendo);
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
            checked={searchFields.includes('editorial')}
            onChange={() => handleToggleSearchField('editorial')}
          />
          Editorial
        </label>
        <label>
          <select
            value={filtroBuscoOVendo ? true : false}
            onChange={(e) => handleFiltroBuscoOVendoChange(e)}
          >
            <option value="todos">Todos</option>
            <option value="true">Busco</option>
            <option value="false">Vendo</option>
          </select>
        </label>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Busqueda;
