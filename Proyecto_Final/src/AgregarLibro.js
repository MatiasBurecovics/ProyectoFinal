import React, { useState, useEffect } from 'react';
import './AgregarLibro.css';
import { useParams, useNavigate } from 'react-router-dom';

const AgregarLibro = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const { userId } = useParams();
    
    const [formData, setFormData] = useState({
        foto: null,
        titulo: '',
        autor: '',
        materia: '',
        editorial: '',
        descripcion: '',
        condicion: '',
        buscoOVendo: '',
        precio: '',
        IdUsuario: userId
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetch(`http://localhost:4000/${id}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Libro no encontrado');
                    }
                })
                .then((data) => {
                    setFormData({
                        foto: data[0].foto,
                        titulo: data[0].titulo,
                        autor: data[0].autor,
                        materia: data[0].materia,
                        editorial: data[0].editorial,
                        descripcion: data[0].descripcion,
                        condicion: data[0].condicion.toString(),
                        buscoOVendo: data[0].buscoOVendo.toString(), 
                        precio: data[0].precio.toString(),
                        IdUsuario: userId, 
                    });
                    setPreviewImage(data[0].foto); 
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            foto: file
        }));
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setPreviewImage(base64Image);
            setFormData(prevData => ({
                ...prevData,
                foto: base64Image 
            }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (parseFloat(formData.precio) < 0) {
            console.error('El precio debe ser un valor positivo.');
            return;
        }
    
        try {
            if (id) {
                const response = await fetch(`http://localhost:4000/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), 
                });
                if (response.status === 200) {
                    console.log('Libro actualizado correctamente');
                } else {
                    console.error('Error al editar el libro');
                }
            } else {
                const response = await fetch('http://localhost:4000/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), 
                });
                if (response.status === 201) {
                    console.log('Libro agregado correctamente');
                } else {
                    console.error('Error al agregar el libro');
                }
            }

            navigate(-1);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>{isEditMode ? 'Editar Libro' : 'Agregar Libro'}</h1>
            <div className="agregar-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Foto:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Vista previa de la imagen"
                                className="preview-image"
                            />
                        )}
                    </label>
                    <label>
                        Título:
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder="Título"
                        />
                    </label>
                    <label>
                        Autor:
                        <input
                            type="text"
                            name="autor"
                            value={formData.autor}
                            onChange={handleChange}
                            placeholder="Autor"
                        />
                    </label>
                    <label>
                        Materia:
                        <input
                            type="text"
                            name="materia"
                            value={formData.materia}
                            onChange={handleChange}
                            placeholder="Materia"
                        />
                    </label>
                    <label>
                        Editorial:
                        <input
                            type="text"
                            name="editorial"
                            value={formData.editorial}
                            onChange={handleChange}
                            placeholder="Editorial"
                        />
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                        />
                    </label>
                    <label>
                        Condición:
                        <select name="condicion" value={formData.condicion} onChange={handleChange}>
                            <option value="">Seleccionar Condición</option>
                            <option value="1">Usado</option>
                            <option value="0">Nuevo</option>
                        </select>
                    </label>
                    <label>
                        Busco o Vendo:
                        <select name="buscoOVendo" value={formData.buscoOVendo} onChange={handleChange}>
                            <option value="">Seleccionar Busco o Vendo</option>
                            <option value="1">Vendo</option>
                            <option value="0">Busco</option>
                        </select>
                    </label>
                    <label>
                        Precio:
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            placeholder="Precio"
                        />
                    </label>
                    <button type="submit">{isEditMode ? 'Guardar Cambios' : 'Agregar Libro'}</button>
                </form>
            </div>
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
};

export default AgregarLibro;
