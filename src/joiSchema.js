const Joi = require('joi'); 
module.exports.noteSchema=Joi.object({
        note: Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required()
        }).required()
});
