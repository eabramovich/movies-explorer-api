import winston from "winston";
import expessWinston from "express-winston";

const requestLogger = expessWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

const errorLogger = expessWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log"})],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };

