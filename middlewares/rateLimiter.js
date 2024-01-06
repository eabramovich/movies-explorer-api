import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Вы превысили лимит в 10 запросов в минуту',
});

export default limiter;
