import { Router } from "express";
import { getCurrentUserInfo, updateCurrentUserInfo } from "../controllers/user.js";
import userUpdateValidate from "../middlewares/userUpdateValidate.js";

const userRouter = Router();

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', userUpdateValidate, updateCurrentUserInfo);


export default userRouter;