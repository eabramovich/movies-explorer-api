import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { SOLD_ROUNDS } from "../utils/constants.js";
import { NotFoundError } from "../errors/not-found-err.js";
import { MongoDuplicateError } from "../errors/mongo-duplicate-error.js";

export const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  return User.find({ email })
    .then((user) => {
      if (user.length > 0) {
        throw new MongoDuplicateError(
          "Пользователь с таким email уже зарегистрирован"
        );
      }

      bcrypt
        .hash(req.body.password, SOLD_ROUNDS)
        .then((hash) => {
          req.body.password = hash;
          return User.create(req.body);
        })
        .then((user) =>
          res.send({
            data: { _id: user._id, name: user.name, email: user.email },
          })
        )
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
  return User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

export const updateCurrentUserInfo = (req, res, next) => {
  return User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
