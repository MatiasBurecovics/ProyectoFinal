import React from 'react';
import { useEffect, useState } from "react";
import TablaLibros from './TablaLibros';




const ListadoLibros = () => {
    const [libros, setLibros] =  useState([])

    useEffect(() => {

        fetch("http://localhost:4000/libros")

          .then((response) => response.json())

          .then((librosJson) => {

            setLibros(librosJson)

          });

      }, []);


  return (
<TablaLibros libros={libros}/>

  );

};

 

export default ListadoLibros;