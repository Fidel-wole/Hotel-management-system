import { Router } from "express";
import AuthenticationController from "../controllers/Authentication/authentication.controller";
 
const authenticationRouter = Router();
authenticationRouter.post("/register", new AuthenticationController().registerUser);
authenticationRouter.post("/login", new AuthenticationController().loginUser);

export default authenticationRouter;