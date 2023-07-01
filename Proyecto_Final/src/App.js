import React, { useState, useEffect } from 'react';
import './App.css';
import Busqueda from './Busqueda';
import TablaLibros from './TablaLibros';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');
  const [libros, setLibros] = useState([]);
  

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchField = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm !== '' && searchField !== '') {
      try {
       
        const response = await fetch(`http://localhost:4000/libros?${searchField}=${searchTerm.toLowerCase()}`);
        if (response.ok) {
          const data = await response.json();
          setLibros(data);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    } else {

      getAllLibros();
    }
  };

  const getAllLibros = async () => {
    try {
      const response = await fetch('http://localhost:4000/libros');
      if (response.ok) {
        const data = await response.json();
        setLibros(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLibros();
  }, []);


  return (
    <div className="App" style={{ backgroundColor: '#233061' }}>
      <Busqueda
        searchTerm={searchTerm}
        searchField={searchField}
        handleSearchTerm={handleSearchTerm}
        handleSearchField={handleSearchField}
        handleSearch={handleSearch}
      />
      <TablaLibros libros={libros} />
    </div>
  );
}

export default App;