import { Router } from "express";
import RoleController from "../controllers/Role/role.controller";
 
const roleRouter = Router();
roleRouter.get("/roles", RoleController.getRoles);


export default roleRouter;