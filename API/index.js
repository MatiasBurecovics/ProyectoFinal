import { getAll, getById, getUsuarioById, insertarLibro, editarLibro } from './Script.js';
import express from "express"
import cors from  "cors";
import Libros from './Libros.js';



const app = express()
const port = 4000
app.use(cors());
app.use(express.json())

app.get('/libros', async(req, res) => {
    const { foto,titulo,autor,materia,editorial,descripcion,condicion,buscoOVendo,precio } = req.query;
    const Libros = await getAll(foto,titulo,autor,materia,editorial,descripcion,condicion,buscoOVendo,precio)
    res.status(200).json(Libros)
})


app.get('/:id', async(req, res) => {
    const id = req.params.id
    if(id<1)
    {
        res.status(400).send()
    }
    const LibrosporId = await getById(id)

     if(LibrosporId[0]==null)
     {
        res.status(404).send()
     }
    res.status(200).send(LibrosporId)
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
  const libroActualizado = req.body; 

  try {
    const resultado = await editarLibro(libroActualizado, id);

    if (resultado.rowsAffected > 0) {
      res.status(200).json({ mensaje: 'Libro actualizado con éxito' });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
});
app.post('/create', async (req, res) => {
    const libro = new Libros();
    libro.foto = req.body.Foto;
    libro.titulo = req.body.Titulo;
    libro.autor = req.body.Autor;
    libro.materia = req.body.Materia;
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