import Joi, { any } from "joi";

const bookSchema = Joi.object({                             // rules for the title, description, thumbnail_url and release_year
    title: Joi.string().max(255).required(),
    description: Joi.string().required(),
    thumbnail_url: Joi.string().uri().required(),           
    release_year: Joi.number().integer().positive().required(),
});