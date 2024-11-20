import e, { Router } from "express";
import UserController from "../controllers/User/user.controller";
import authMiddleWare from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import StaffController from "../controllers/User/staff.controller";

const userRouter = Router();

userRouter.get("/user", authMiddleWare, UserController.getUserById);
userRouter.post("/admin/add-staff", authMiddleWare, roleMiddleware(["admin"]), StaffController.addStaff)
export default userRouter;