import sql from 'mssql';
import configDB from './DB.js';

export const getAll = async (autor='',titulo='',editorial='',buscoOVendo=false) => {
    const conn = await sql.connect(configDB);
    let query = `SELECT * FROM Libros`; 
    let where=false
  
      if (autor) {

      if(where)
    {
      query += ` AND autor LIKE '%${autor}%'`;
    }
     else
     {
      query += ` WHERE autor LIKE '%${autor}%'`;
      where=true
     }
    }

    if (titulo) {
      if(where)
      {
        query += ` AND titulo LIKE '%${titulo}%'`;
      }
       else
       {
        query += ` WHERE titulo LIKE '%${titulo}%'`;
        where=true
       }
    }
  
    if (editorial) {
      if(where)
      {
        query += ` AND editorial LIKE '%${editorial}%'`;
      }
       else
       {
        query += ` WHERE editorial LIKE '%${editorial}%'`;
        where=true
       }
       if (buscoOVendo) {
        if(where)
        {
          query += ` AND buscoOVendo LIKE '%${buscoOVendo}%'`;
        }
         else
         {
          query += ` WHERE buscoOVendo LIKE '%${buscoOVendo}%'`;
          where=true
         }
        }
    
    }
    
    const results = await conn.request().query(query);
    return results.recordset;
  };

 export const obtenerLibroPorId = async (id) => {
    const pool = await sql.connect(configDB);
    const response = await pool.request()
      .input('pId',sql.Int,id)
      .query('SELECT * FROM Libros WHERE Id = @pId');
    
    return response.recordset;
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
      .input("ptitulo", sql.VarChar, libro?.titulo ?? '')
      .input("pEditorial", sql.VarChar, libro?.editorial ?? '')
      .input("pDescripcion", sql.VarChar, libro?.descripcion ?? '')
      .input("pCondicion", sql.Bit, libro?.condicion ?? false)
      .input("pBuscoOVendo", sql.Bit, libro?.buscoOvendo ?? false)
      .input("pPrecio", sql.Int, libro?.precio ?? 0)
      .input("pIdUsuario", sql.Int, libro?.IdUsuario ?? 0)
      .query("INSERT INTO Libros(Foto, Titulo, Autor, titulo, Editorial, Descripcion, Condicion, BuscoOVendo, Precio, IdUsuario) VALUES (@pFoto, @pTitulo, @pAutor, @ptitulo, @pEditorial, @pDescripcion, @pCondicion, @pBuscoOVendo, @pPrecio, @pIdUsuario)");
  
  console.log(results);
  return results.recordset;
}
export const editarLibro = async (libro, id) => {
  const pool = await sql.connect(configDB);
  const valoresOriginales = await obtenerLibroPorId(id);
  
  const response = await pool.request()
    .input('Id', sql.Int, id)
    .input('Foto', sql.VarChar, libro.foto || (valoresOriginales?.foto || ''))
    .input('Titulo', sql.VarChar, libro.titulo || (valoresOriginales?.titulo || ''))
    .input('Autor', sql.VarChar, libro.autor || (valoresOriginales?.autor || ''))
    .input('titulo', sql.VarChar, libro.titulo || (valoresOriginales?.titulo || ''))
    .input('Editorial', sql.VarChar, libro.editorial || (valoresOriginales?.editorial || ''))
    .input('Descripcion', sql.VarChar, libro.descripcion || (valoresOriginales?.descripcion || ''))
    .input('Condicion', sql.Bit, libro.condicion || (valoresOriginales?.condicion || false))
    .input('BuscoOVendo', sql.Bit, libro.buscoOVendo || (valoresOriginales?.buscoOVendo || false))
    .input('Precio', sql.Int, libro.precio || (valoresOriginales?.precio || 0))
    .query(`UPDATE Libros SET Foto = @Foto, Titulo = @Titulo, Autor = @Autor, titulo = @titulo, Editorial = @Editorial, Descripcion = @Descripcion, Condicion = @Condicion, BuscoOVendo = @BuscoOVendo, Precio = @Precio WHERE Id = @Id`);
  
  console.log(response);
  
  return {
    rowsAffected: response.rowsAffected[0],
    recordset: response.recordset
  };
};