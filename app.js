import express, { json } from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

import { requestLogger, errorLogger } from './middlewares/logger.js';
import limiter from './middlewares/rateLimiter.js';

const { PORT = 3001, CONNECT_BD = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(CONNECT_BD);

app.use(limiter);
app.use(json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} `);
});
