import express, { json } from 'express';
import mongoose from "mongoose";
import router from './routes/index.js';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { limiter } from './middlewares/rateLimiter.js';

const { PORT = 3000, CONNECT_BD = 'mongodb://127.0.0.1:27017/bitfilmsdb'} = process.env;

const app = express();
mongoose.connect(CONNECT_BD);

app.use(limiter);
app.use(json());
app.use(helmet());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Передан невалидный id';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Ошибка валидации полей ' + err;
  }

  if(err.name === 'JsonWebTokenError') {
    return res.status(401).send({ message: 'С токеном что-то не так' });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} `)
})