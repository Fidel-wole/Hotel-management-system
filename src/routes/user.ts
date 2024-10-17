import e, { Router } from "express";
import UserController from "../controllers/User/user.controller";
import authMiddleWare from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/user", authMiddleWare, UserController.getUserById);
export default userRouter;