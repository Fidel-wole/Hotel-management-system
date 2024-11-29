import RoomCategoryController from "../controllers/Room/category.controller";
import RoomController from "../controllers/Room/room.controller";
import { Router } from "express";
import authMiddleWare from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const roomRouter = Router();
roomRouter.post("/room", authMiddleWare, roleMiddleware(["receptionist", "admin"]), RoomController.createRoom);
roomRouter.get("/rooms", RoomController.getRooms);
roomRouter.get("/room/:id", RoomController.getRoomById);
roomRouter.get("/rooms/category/:categoryId", authMiddleWare, RoomController.getRoomsByCategory);
roomRouter.put("/room/:id", authMiddleWare, roleMiddleware(["receptionist", "admin"]), RoomController.updateRoom);
roomRouter.post("/category",authMiddleWare,  roleMiddleware(["receptionist", "admin"]), RoomCategoryController.createCategory);
roomRouter.get("/categories", RoomCategoryController.getCategories);
roomRouter.get("/category/:id", RoomCategoryController.getCategoryById);
roomRouter.put("/category/:id", authMiddleWare, roleMiddleware(["receptionist", "admin"]), RoomCategoryController.updateCategory);
roomRouter.delete("/category/:id", authMiddleWare, roleMiddleware(["receptionist", "admin"]), RoomCategoryController.deleteCategory);

export default roomRouter;