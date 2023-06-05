import sql from 'mssql';
import configDB from './DB.js';

export const getAll = async () => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().query('SELECT * FROM Libros');
    return results.recordset;
}


export const getById = async (id) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId",id).query('SELECT * FROM libros WHERE @pId = IdUsuario');
    return results.recordset;
}