import { Router } from "express";
import { getCurrentUserInfo, updateCurrentUserInfo } from "../controllers/user";
import userUpdateValidate from "../middlewares/userUpdateValidate";

const userRouter = Router();

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', userUpdateValidate, updateCurrentUserInfo);


export default userRouter;