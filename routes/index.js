import { Router } from "express";
import userRouter from "./user";
import movieRouter from "./movie";
import auth from "../middlewares/auth";
import { createUser, login } from "../controllers/user";
import { NotFoundError } from "../errors/not-found-err";
import userSignUpValidate from "../middlewares/userSignUpValidate";
import userSignInValidate from "../middlewares/userSignInValidate";

const router = Router();

router.post("/signup", userSignUpValidate, createUser);
router.post("/signin", userSignInValidate, login);
router.use("/users", auth, userRouter);
router.use("/movies", auth, movieRouter);
router.use("*", auth, (req, res, next) => {
  next(new NotFoundError("Ресурс не найден. Проверьте URL и метод запроса"));
});

export default router;