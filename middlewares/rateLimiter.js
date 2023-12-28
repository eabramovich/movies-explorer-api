import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  max: 60 * 1000,
  max: 10,
  message: "Вы превысили лимит в 10 запросов в минуту",
});