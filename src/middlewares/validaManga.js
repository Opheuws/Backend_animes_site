
const joi = require('joi');
const { route } = require('../routes/routeManga');

const MANGA = joi.object({
    titulo: joi.string().required().min(2),
    autor: joi.string().required(),
    genero:joi.string().required(),
    paginas:joi.number().required(),
})

function validaManga(req, res, next) {
    const {titulo, autor, genero, paginas} = req.body;

    const {error} = MANGA.validate({titulo, autor, genero, paginas}); //O Joi captura um erro
    console.log(error);
    if (error) {
        next({status: 400, message: error.details[0].message});
    }

    // console.log(error);
    next();
}

module.exports = validaManga;


