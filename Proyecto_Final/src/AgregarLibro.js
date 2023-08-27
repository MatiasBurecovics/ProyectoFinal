import React, { useState } from 'react';
import './AgregarLibro.css';

const AgregarLibro = () => {
    const [formData, setFormData] = useState({
        Foto: '',
        Titulo: '',
        Autor: '',
        Materia: '',
        Editorial: '',
        Descripcion: '',
        Condicion: '',
        BuscoOVendo: '',
        Precio: '' ,
        IdUsuario: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:4000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                console.log('Libro agregado correctamente');
                window.location.reload();
                setFormData({
                    Foto: '',
                    Titulo: '',
                    Autor: '',
                    Materia: '',
                    Editorial: '',
                    Descripcion: '',
                    Condicion: '',
                    BuscoOVendo: '',
                    Precio: '' ,
                    IdUsuario: 0
                });
            } else {
                console.log('Error al agregar el libro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Agregar Libro</h2>
            <div className="agregar-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Foto:
                        <input
                            type="text"
                            name="Foto"
                            value={formData.foto}
                            onChange={handleChange}
                            placeholder="Foto"
                            required
                        />
                    </label>
                    <label>
                        Título:
                        <input
                            type="text"
                            name="Titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder="Título"
                            required
                        />
                    </label>
                    <label>
                        Autor:
                        <input
                            type="text"
                            name="Autor"
                            value={formData.autor}
                            onChange={handleChange}
                            placeholder="Autor"
                            required
                        />
                    </label>
                    <label>
                        Materia:
                        <input
                            type="text"
                            name="Materia"
                            value={formData.materia}
                            onChange={handleChange}
                            placeholder="Materia"
                            required
                        />
                    </label>
                    <label>
                        Editorial:
                        <input
                            type="text"
                            name="Editorial"
                            value={formData.editorial}
                            onChange={handleChange}
                            placeholder="Editorial"
                            required
                        />
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            name="Descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                            required
                        />
                    </label>
                    <label>
                        Condición:
                        <select name="Condicion" onChange={handleChange} required>
            <option value="1">Usado</option>
            <option value="0">Nuevo</option>
        
          </select>  
                    </label>
                    <label>
                        Busco o Vendo:
                        <select name="BuscoOVendo" onChange={handleChange} required>
            <option value="1">Vendo</option>
            <option value="0">Busco</option>
        
          </select>  
                    </label>
                    <label>
                        Precio:
                        <input
                            type="number"
                            name="Precio"
                            value={formData.precio}
                            onChange={handleChange}
                            placeholder="Precio"
                            required
                        />
                    </label>
                    <label>
                        Id Usuario:
                        <input
                            type="number"
                            name="IdUsuario"
                            value={formData.idUsuario}
                            onChange={handleChange}
                            placeholder="IdUsuario"
                            required
                        />
                    </label>
                    <button type="submit">Agregar Libro</button>
                </form>
            </div>
        </div>
    );
};

export default AgregarLibro;
