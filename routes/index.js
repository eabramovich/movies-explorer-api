import { Router } from 'express';
import userRouter from './user.js';
import movieRouter from './movie.js';
import auth from '../middlewares/auth.js';
import { createUser, login } from '../controllers/user.js';
import NotFoundError from '../errors/not-found-err.js';
import userSignUpValidate from '../middlewares/userSignUpValidate.js';
import userSignInValidate from '../middlewares/userSignInValidate.js';

const router = Router();

router.post('/signup', userSignUpValidate, createUser);
router.post('/signin', userSignInValidate, login);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

export default router;
