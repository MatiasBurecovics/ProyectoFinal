import React from 'react';
import { useEffect, useState } from "react";
import './ListadoLibros.css';



const ListadoLibros = () => {
    const [libros, setLibros] =  useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:4000/libros")

          .then((response) => response.json())

          .then((librosJson) => {

            console.log("libros",librosJson)

            setLibros(librosJson)

            setIsLoading(false)

          });

      }, []);

  return (

    <table>

      <thead>

        <tr>
          <th>Foto</th>

          <th>Titulo</th>

          <th>Condicion</th>

          <th>Busco o Vendo</th>

          <th>Autor</th>

          <th>Materia</th>

          <th>Precio</th>

          <th>Editorial</th>
          <th>Descripcion</th>

        </tr>

      </thead>

      <tbody>

        {!isLoading &&

          libros.map((libro) => (

            <tr key = {libro.Id}>

<td> 
  <img src={libro.foto} alt="Foto del libro" />
              </td>
            <td>{libro.titulo}</td>
            <td>{libro.condicion  ? "Nuevo" : "Usado"}</td>
            <td>{libro.buscoOVendo  ? "Busco" : "Vendo"}</td>
           
            <td>{libro.autor}</td>

            <td>{libro.materia}</td>

            <td>{libro.precio}</td>

            <td>{libro.editorial}</td>

            <td>{libro.descripcion}</td>

          </tr>

 

          ))

 

        }

      </tbody>

    </table>

  );

};

 

export default ListadoLibros;