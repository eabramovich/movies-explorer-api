import { Joi, celebrate } from "celebrate";

export default celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  })
})