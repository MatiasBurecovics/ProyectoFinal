import { getAll, getUsuarioById, insertarLibro, editarLibro, obtenerLibroPorId } from './Script.js';
import express from "express"
import cors from  "cors";
import Libros from './Libros.js';



const app = express()
const port = 4000
app.use(cors());
app.use(express.json())

app.get('/libros', async(req, res) => {
    const { autor,titulo,editorial,buscoOVendo } = req.query;
    const Libros = await getAll(autor,titulo,editorial,buscoOVendo)
    res.status(200).json(Libros)
})

app.get('/:id', async(req, res) => {
    const id = req.params.id
    if(id<1)
    {
        res.status(400).send()
    }
    const LibrosporId = await obtenerLibroPorId(id)

     if(LibrosporId[0]==null)
     {
        res.status(404).send()
     }
    res.status(200).json(LibrosporId)
})
app.get('/usuario/:id', async(req, res) => {
    const id = req.params.id
    if(id<1)
    {
        res.status(400).send()
    }
    const UsuarioporId = await getUsuarioById(id)

     if(UsuarioporId[0]==null)
     {
        res.status(404).send()
     }
    res.status(200).send(UsuarioporId)
})
app.put('/update/:id', async (req, res) => {
  const id = req.params.id;

  if(id<1)
{
    return res.status(400).send();
}
  const updateLibro = await editarLibro(req.body, id);
  if(updateLibro.rowsAffected === 0)
  {
      return res.status(404).send();
  }
  else if(updateLibro!=null){
  return res.status(200).send(updateLibro);
  }
});
app.post('/create', async (req, res) => {
    const libro = new Libros();
    libro.foto = req.body.Foto;
    libro.titulo = req.body.Titulo;
    libro.autor = req.body.Autor;
    libro.titulo = req.body.titulo;
    libro.editorial = req.body.Editorial;
    libro.descripcion = req.body.Descripcion;
    libro.condicion = req.body.Condicion;
    libro.buscoOVendo = req.body.BuscoOVendo;
    libro.precio = req.body.Precio;
    libro.IdUsuario=req.body.IdUsuario;
    const create = await insertarLibro(libro); 
    return res.status(201).send(create);
    });

app.listen(port, async( ) => {
    console.log(`Example app listening on port ${port}`)
})