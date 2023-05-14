const express = require('express')
const connection = require('../db/connection');
const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulo');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const { capitulo, titulo_anime, paginas, manga_id } = req.body;
    const [result] = await connection.execute('INSERT INTO capitulo(capitulo, titulo_anime, paginas, manga_id) VALUES(?,?,?,?)', [capitulo, titulo_anime, paginas, manga_id]);

    const newcapitulo = {
        id: result.insertId,
        capitulo,
        titulo_anime,
        paginas,
        manga_id
    };
    res.status(201).json(newcapitulo);
});

route.put('/:id', async (req, res) => {
    const { capitulo, titulo_anime, paginas, manga_id } = req.body;
    const { id } = req.params;

    await connection.execute(`UPDATE capitulo SET capitulo = ?, titulo_anime = ? , paginas=?, manga_id=? WHERE id = ?`, [capitulo, titulo_anime, paginas, manga_id, id]);

    const newCapitulo = {
        id: parseInt(id),
        capitulo,
        titulo_anime,
        paginas,
        manga_id
    };

    res.status(201).json(newCapitulo);
});

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await connection.execute('DELETE FROM capitulo WHERE id=?', [id]);

    res.status(204).send();
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [[result]] = await connection.execute('SELECT * FROM capitulo WHERE id =?', [id]);
    res.status(200).json(result);
});

module.exports = route;
