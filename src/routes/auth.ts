import { Router } from "express";
import AuthenticationController from "../controllers/Authentication/authentication.controller";
 
const authenticationRouter = Router();
authenticationRouter.post("/register", AuthenticationController.registerUser);
authenticationRouter.post("/login", AuthenticationController.loginUser);

export default authenticationRouter;