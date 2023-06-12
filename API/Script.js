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