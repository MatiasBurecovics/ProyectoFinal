import React, { useState, useEffect } from 'react';
import './App.css';
import Busqueda from './Busqueda';
import TablaLibros from './TablaLibros';
import AgregarLibro from './AgregarLibro';
import DetalleLibro from './DetalleLibro';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFields, setSearchFields] = useState([]);
  const [libros, setLibros] = useState([]);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleVerDetalles = (libro) => {
    setSelectedLibro(libro);
    setShowDetails(true);
  };
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedLibro(null);
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleToggleSearchField = (field) => {
    if (searchFields.includes(field)) {
      setSearchFields(searchFields.filter((f) => f !== field));
    } else {
      setSearchFields([...searchFields, field]);
    }
  };
  const handleSearch = async () => {
    if (searchTerm !== '' && searchFields.length > 0) {
      try {
        const queryParams = searchFields.map((field) => `${field}=${searchTerm.toLowerCase()}`).join('&');
  
        const response = await fetch(`http://localhost:4000/libros?${queryParams}`);
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
  searchFields={searchFields}
  handleSearchTerm={handleSearchTerm}
  handleToggleSearchField={handleToggleSearchField}
  handleSearch={handleSearch}
/>
     <button onClick={toggleAddForm}>Formulario para agregar libro</button>
    {showAddForm && <AgregarLibro />}
    {showDetails && selectedLibro && (
        <DetalleLibro libro={selectedLibro} handleClose={handleCloseDetails} />
      )}
      {!showDetails && (
        <TablaLibros libros={libros} handleVerDetalles={handleVerDetalles} />
      )}
    </div>
  );
}

export default App;