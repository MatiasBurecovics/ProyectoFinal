import { getAll, getById } from './Script.js';
import express from "express"
import cors from  "cors";



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
    console.log(LibrosporId)
     if(LibrosporId[0]==null)
     {
        res.status(404).send()
     }
    res.status(200).send(LibrosporId)
})
app.listen(port, async( ) => {
    console.log(`Example app listening on port ${port}`)
})