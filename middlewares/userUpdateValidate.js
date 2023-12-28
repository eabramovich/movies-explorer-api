import { Joi, celebrate } from "celebrate";

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    email: Joi.string().email(),
  })
})