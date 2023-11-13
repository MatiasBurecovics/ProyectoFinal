import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Busqueda from './Busqueda';
import TablaLibros from './TablaLibros';
import AgregarLibro from './AgregarLibro';
import DetalleLibro from './DetalleLibro';
import MisLibros from './Mislibros';
import PantallaInicio from './PantallaInicio';
import Registro from './Registro';
import IniciarSesion from './IniciarSesion';
import ChatScreen from './ChatScreen';

function App() {
  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFields, setSearchFields] = useState([]);

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
          return `${field}=${term.toLowerCase()}`;
        }).join('&');
  
  
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


  const handleVerDetalles = (libro) => {
    setSelectedLibro(libro);
    setShowDetails(true);
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PantallaInicio />} />
          <Route path="/login" element={<IniciarSesion setUserId={setUserId} />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/home"
            element={
              <>
                <Busqueda   searchTerm={searchTerm}
  searchFields={searchFields}
  handleSearchTerm={handleSearchTerm}
  handleToggleSearchField={handleToggleSearchField}
  handleSearch={handleSearch} />
                <TablaLibros
                  libros={libros}
                  handleVerDetalles={handleVerDetalles}
                  usuarios={usuarios}
                  userId={userId}
                />
              </>
            }
            />
            <Route path="/detalle-libro/:id" element={<DetalleLibro />} />
            <Route path="/agregar-libro/:userId" element={<AgregarLibro />} />
            <Route path="/mis-libros/:userId" element={<MisLibros userId={userId} />} />
            <Route path="/editar-libro/:id" element={<AgregarLibro />} />
            <Route path="/chat/:id" element={<ChatScreen />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
