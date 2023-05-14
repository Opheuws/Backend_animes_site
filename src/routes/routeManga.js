const express = require('express')
const connection = require('../db/connection');
const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const {titulo, autor, genero, paginas} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(titulo, autor, genero, paginas) VALUES(?,?,?,?)',[titulo, autor, genero, paginas])
   
    const newManga = {
        id:result.insertId,
        titulo, 
        autor, 
        genero, 
        paginas
    }
    res.status(201).json(newManga);
})
route.put('/:id', (req, res) => {
    const {titulo, autor, genero, paginas} = req.body;
    const {id} = req.params;

    const updateManga = connection.execute(`UPDATE mangas
    SET titulo = ?, autor = ? , genero=?, paginas=?
    WHERE id = ?`, [titulo, autor, genero, paginas, id])

    const newManga = {
        id:result.insertId(),
        titulo, 
        autor, 
        genero, 
        paginas
    }

    res.status(201).json(newManga);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM mangas WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;