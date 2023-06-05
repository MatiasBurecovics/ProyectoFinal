import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';



const TablaLibros = ({ libros }) => {
  const data = useMemo(() => {
    return libros.map((libro) => ({
      name: {
        foto: <img src={libro.foto} alt={libro.titulo} style={{ width: '100px' }} />,
        titulo: libro.titulo,
        precio: libro.precio,
      },
      condicion: libro.condicion ? "Nuevo" : "Usado",
      buscoOVendo: libro.buscoOVendo ? "Busco" : "Vendo",
      autor: libro.autor,
      materia: libro.materia,
      editorial: libro.editorial,
      descripcion: libro.descripcion,
    }));
  }, [libros]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.foto',
        header: 'Foto',
      },
      {
        accessorKey: 'name.titulo',
        header: 'Titulo',
        size: 150,
      },
      {
        accessorKey: 'name.precio',
        header: 'Precio',
        size: 150,
      },
      {
        accessorKey: 'condicion',
        header: 'Condicion',
        size: 200,
      },
      {
        accessorKey: 'buscoOVendo',
        header: 'Busco o Vendo',
        size: 150,
      },
      {
        accessorKey: 'materia',
        header: 'Materia',
        size: 150,
      },
      {
        accessorKey: 'editorial',
        header: 'Editorial',
        size: 150,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripcion',
        size: 150,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default TablaLibros;
