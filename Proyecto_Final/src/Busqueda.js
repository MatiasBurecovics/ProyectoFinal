import React from 'react';

function Busqueda(props) {
  const { searchTerm, searchFields, handleSearchTerm, handleToggleSearchField, handleSearch , filtroBuscoOVendo,setFiltroBuscoOVendo} = props;
  
  const handleFiltroBuscoOVendoChange = (e) => {
    setFiltroBuscoOVendo(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm, searchFields,searchFields.includes('busco'), searchFields.includes('vendo'));
  };

  return (
    <div>
      <h2>Búsqueda</h2>
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
        <label>
  <select
    value={filtroBuscoOVendo}
    onChange={(e) => handleFiltroBuscoOVendoChange(e)}
  >
    <option value="todos">Todos</option>
    <option value="busco">Busco</option>
    <option value="vendo">Vendo</option>
  </select>
</label>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Busqueda;
