import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateToken from '../utils/jwt.js';
import { SOLD_ROUNDS } from '../utils/constants.js';
import MongoDuplicateError from '../errors/mongo-duplicate-error.js';

export const createUser = (req, res, next) => {
  const { email } = req.body;
  return User.find({ email })
    .then((user) => {
      if (user.length > 0) {
        throw new MongoDuplicateError(
          'Пользователь с таким email уже зарегистрирован',
        );
      }

      bcrypt
        .hash(req.body.password, SOLD_ROUNDS)
        .then((hash) => {
          req.body.password = hash;
          return User.create(req.body);
        })
        .then((result) => res.send({
          data: { _id: result._id, name: result.name, email: result.email },
        }))
        .catch(next);
    })
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id, email: user.email });

      res.send({ token });
    })
    .catch(next);
};

export const getCurrentUserInfo = (req, res, next) => {
  const id = req.user._id;
  return User.findOne({ _id: id })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

export const updateCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email } = req.body;
  return User.find({ email })
    .then((user) => {
      if (user.length > 0) {
        throw new MongoDuplicateError('Пользователь с таким email уже зарегистрирован');
      }
      return User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      })
        .then((result) => {
          res.send({ data: result });
        })
        .catch(next);
    })
    .catch(next);
};
