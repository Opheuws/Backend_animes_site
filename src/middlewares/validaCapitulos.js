const joi = require('joi');

const CAPITULO = joi.object({
    capitulo: joi.number().required(),
    titulo_anime: joi.string().required(),
    paginas:joi.number().required(),
    manga_id:joi.number().required(),
})

function validaManga(req, res, next) {
    const {capitulo, titulo_anime, paginas, manga_id} = req.body;

    const {error} = CAPITULO.validate({capitulo, titulo_anime, paginas, manga_id}); //O Joi captura um erro
    console.log(error);
    if (error) {
        next({status: 400, message: error.details[0].message});
    }

    // console.log(error);
    next();
}

module.exports = validaManga;