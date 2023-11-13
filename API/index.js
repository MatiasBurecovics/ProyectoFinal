import { getAll, getUsuarioById, insertarLibro, editarLibro, obtenerLibroPorId, insertarUsuario, getAllUsuarios, getById } from './Script.js';
import express from "express"
import cors from  "cors";
import Libros from './Libros.js';
import Usuario from './Usuario.js';


const app = express()
const port = 4000
app.use(cors());
app.use(express.json())


app.get('/libros', async(req, res) => {
    const { autor,titulo,editorial } = req.query;
    const Libros = await getAll(autor,titulo,editorial)
    res.status(200).json(Libros)
})
app.get('/usuarios', async(req, res) => {
    const Usuario = await getAllUsuarios()
    res.status(200).json(Usuario)
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
app.get('/libro/:id', async(req, res) => {
  const id = req.params.id
  if(id<1)
  {
      res.status(400).send()
  }
  const UsuarioporId = await getById(id)

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
    libro.foto = req.body.foto;
    libro.titulo = req.body.titulo;
    libro.autor = req.body.autor;
    libro.materia = req.body.materia;
    libro.editorial = req.body.editorial;
    libro.descripcion = req.body.descripcion;
    libro.condicion = req.body.condicion;
    libro.buscoOVendo = req.body.buscoOVendo;
    libro.precio = req.body.precio;
    libro.IdUsuario=req.body.IdUsuario;

    const create = await insertarLibro(libro); 
    return res.status(201).send(create);
    });

    app.post('/registro', async (req, res) => {
        const usuario = new Usuario();
        usuario.mail = req.body.mail;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.sede = req.body.sede;
        usuario.foto = req.body.foto;
        usuario.contraseña = req.body.contraseña;

        const create = await insertarUsuario(usuario); 
        return res.status(201).send(create);
        });

        app.post('/login', async (req, res) => {
          const { mail, contraseña } = req.body;
        
          const usuario = await findUserByCredentials(mail, contraseña);
        
          if (usuario) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', Id: usuario.Id });
          } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
          }
        });
        
        const findUserByCredentials = async (mail, contraseña) => {
          const usuarios = await getAllUsuarios();
        
          return usuarios.find((usuario) => usuario.mail === mail && usuario.contraseña === contraseña);
        };
        

app.listen(port, async( ) => {
    console.log(`Example app listening on port ${port}`)
})