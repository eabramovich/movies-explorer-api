import jwt from 'jsonwebtoken';
import NotAuthenticateError from '../errors/not-authenticate-err.js';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthenticateError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'some-secret-key');
  } catch (error) {
    return next(new NotAuthenticateError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

export default auth;
