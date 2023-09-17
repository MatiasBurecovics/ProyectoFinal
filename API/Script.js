import sql from 'mssql';
import configDB from './DB.js';

export const getAll = async (foto,titulo,autor,materia,editorial,descripcion,condicion,buscoOVendo,precio) => {
    const conn = await sql.connect(configDB);
    let query = `SELECT * FROM Libros WHERE 1=1`; 
  
    if (foto) {
        query += ` AND foto LIKE '%${foto}%'`;
      }
      
      if (titulo) {
        query += ` AND titulo LIKE '%${titulo}%'`;
      }
      
      if (autor) {
        query += ` AND autor LIKE '%${autor}%'`;
      }
      
      if (materia) {
        query += ` AND materia LIKE '%${materia}%'`;
      }
      
      if (editorial) {
        query += ` AND editorial LIKE '%${editorial}%'`;
      }
      
      if (descripcion) {
        query += ` AND descripcion LIKE '%${descripcion}%'`;
      }
      if (condicion !== undefined) {
        query += ` AND condicion = ${condicion}`;
      }
      
      if (buscoOVendo !== undefined) {
        query += ` AND buscoOVendo = ${buscoOVendo}`;
      }
      
      if (precio!== undefined) {
        query += ` AND precio = ${precio}`;
      }
  
    const results = await conn.request().query(query);
    return results.recordset;
  };

export const getById = async (id) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId",id).query('SELECT * FROM libros WHERE @pId = IdUsuario');
    return results.recordset;
}
export const getUsuarioById = async(id)=>
{
  const conn = await sql.connect(configDB);
  const results = await conn.request().input("pId",id).query('SELECT * FROM Usuario WHERE @pId = Id');
  return results.recordset;
}
export const insertarLibro = async (libro) => {
  const conn = await sql.connect(configDB);
  const results = await conn.request()
      .input("pFoto", sql.VarChar, libro?.foto ?? '')
      .input("pTitulo", sql.VarChar, libro?.titulo ?? '')
      .input("pAutor", sql.VarChar, libro?.autor ?? '')
      .input("pMateria", sql.VarChar, libro?.materia ?? '')
      .input("pEditorial", sql.VarChar, libro?.editorial ?? '')
      .input("pDescripcion", sql.VarChar, libro?.descripcion ?? '')
      .input("pCondicion", sql.Bit, libro?.condicion ?? false)
      .input("pBuscoOVendo", sql.Bit, libro?.buscoOvendo ?? false)
      .input("pPrecio", sql.Int, libro?.precio ?? 0)
      .input("pIdUsuario", sql.Int, libro?.IdUsuario ?? 0)
      .query("INSERT INTO Libros(Foto, Titulo, Autor, Materia, Editorial, Descripcion, Condicion, BuscoOVendo, Precio, IdUsuario) VALUES (@pFoto, @pTitulo, @pAutor, @pMateria, @pEditorial, @pDescripcion, @pCondicion, @pBuscoOVendo, @pPrecio, @pIdUsuario)");
  
  console.log(results);
  return results.recordset;
}
export const editarLibro = async (libro) => {
  const conn = await sql.connect(configDB);
  const results = await conn.request()
    .input("pId", sql.Int, libro?.Id ?? 0)
    .input("pFoto", sql.VarChar, libro?.foto ?? '')
    .input("pTitulo", sql.VarChar, libro?.titulo ?? '')
    .input("pAutor", sql.VarChar, libro?.autor ?? '')
    .input("pMateria", sql.VarChar, libro?.materia ?? '')
    .input("pEditorial", sql.VarChar, libro?.editorial ?? '')
    .input("pDescripcion", sql.VarChar, libro?.descripcion ?? '')
    .input("pCondicion", sql.Bit, libro?.condicion ?? false)
    .input("pBuscoOVendo", sql.Bit, libro?.buscoOvendo ?? false)
    .input("pPrecio", sql.Int, libro?.precio ?? 0)
    .query("UPDATE Libros SET Foto = @pFoto, Titulo = @pTitulo, Autor = @pAutor, Materia = @pMateria, Editorial = @pEditorial, Descripcion = @pDescripcion, Condicion = @pCondicion, BuscoOVendo = @pBuscoOVendo, Precio = @pPrecio WHERE Id = @pId");

  console.log(results);
  return results.recordset;
}