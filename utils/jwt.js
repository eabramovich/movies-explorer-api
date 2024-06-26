import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

export default generateToken;
