import { Joi, celebrate } from "celebrate";
import { URL_PATTERN } from "../utils/constants";

export default celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().pattern(new RegExp(URL_PATTERN)),
    trailerLink: Joi.string().pattern(new RegExp(URL_PATTERN)),
    image: Joi.string().pattern(new RegExp(URL_PATTERN)),
  })
})