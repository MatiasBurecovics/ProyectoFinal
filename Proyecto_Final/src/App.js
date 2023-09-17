import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Busqueda from './Busqueda';
import TablaLibros from './TablaLibros';
import AgregarLibro from './AgregarLibro';
import DetalleLibro from './DetalleLibro';
import MisLibros from './Mislibros';
import EditarLibro from './editarLibro';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFields, setSearchFields] = useState([]);
  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filtroBuscoOVendo, setFiltroBuscoOVendo] = useState('todos'); 

  const handleVerDetalles = (libro) => {
    setSelectedLibro(libro);
    setShowDetails(true);
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


  const handleSearch = async (term, fields) => {
    if (term !== '' && fields.length > 0) {
      try {
        const queryParams = fields.map((field) => {
          if (field === 'true' || field === 'false') {
            return `buscoOVendo=${field === 'true'}`;
          }
          return `${field}=${term.toLowerCase()}`;
        }).join('&');
  
        const filtroQueryParam = filtroBuscoOVendo === 'todos' ? '' : `&buscoOVendo=${filtroBuscoOVendo}`;
  
        const response = await fetch(`http://localhost:4000/libros?${queryParams}${filtroQueryParam}`);
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

  useEffect(() => {
    async function fetchUsuario(idUsuario) {
      try {
        const response = await fetch(`http://localhost:4000/usuario/${idUsuario}`);
        if (response.ok) {
          const data = await response.json();
          setUsuarios((prevUsuarios) => ({
            ...prevUsuarios,
            [idUsuario]: data[0]?.nombre || 'Usuario no encontrado',
          }));
        } else {
          console.error('Error al obtener datos de usuario:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    libros.forEach((libro) => {
      if (!usuarios[libro.IdUsuario]) {
        fetchUsuario(libro.IdUsuario);
      }
    });
  }, [libros, usuarios]);

  return (
    <div className="App" style={{ backgroundColor: '#233061' }}>
      <Busqueda
  searchTerm={searchTerm}
  searchFields={searchFields}
  handleSearchTerm={handleSearchTerm}
  handleToggleSearchField={handleToggleSearchField}
  handleSearch={handleSearch}
  filtroBuscoOVendo={filtroBuscoOVendo}
  setFiltroBuscoOVendo={setFiltroBuscoOVendo}
   
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TablaLibros libros={libros} handleVerDetalles={handleVerDetalles} usuarios={usuarios} />} />
          <Route path="/detalle-libro/:id" element={<DetalleLibro libros={libros} />} />
          <Route path="/agregar-libro" element={<AgregarLibro />} />
          <Route path="/mis-libros" element={<MisLibros />} />
          <Route path="/editar-libro/:id" element={<EditarLibro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
