import { Joi, celebrate } from 'celebrate';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
