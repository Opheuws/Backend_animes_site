const express = require('express');
require('express-async-errors');
const {routeManga}= require('./routes')
const {routeCapitulo}= require('./routes');

require('dotenv').config();
const validaManga = require('./middlewares/validaManga');
const validaCapitulos = require('./middlewares/validaCapitulos');

const variavelTest = process.env.TESTE


const errorMiddleware = require('./middlewares/errorMiddleware')
const app = express();
app.use(express.json());
app.use('/mangas',validaManga,routeManga);
app.use('/capitulo', validaCapitulos, routeCapitulo);
app.use(errorMiddleware)

app.get('/', async (req, res) => {
    res.status(200).send('olá', variavelTest); 
 });

module.exports ={
    app,
}
