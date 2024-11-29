import RoomService from "../../services/Room/room.service";
import { Request, Response } from "express";
import { Room as RoomInterface } from "../../interface/room";
import Dispatcher from "../../utils/dispatcher";

export default class RoomController {
  static async createRoom(req: Request, res: Response) {
    try {
      const data: RoomInterface = req.body;
      const room = await RoomService.createRoom(data);
      Dispatcher.DispatchSuccessMessage(res, "Room created successfully", room);
    } catch (error: any) {
      Dispatcher.DispatchErrorMessage(res, error);
    }
  }
  static async getRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getRooms();
      Dispatcher.DispatchSuccessMessage(
        res,
        "Rooms fetched successfully",
        rooms
      );
    } catch (error: any) {
      Dispatcher.DispatchErrorMessage(res, error);
    }
  }
  static async getRoomById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const room = await RoomService.getRoomById(id);
      Dispatcher.DispatchSuccessMessage(res, "Room fetched", room);
    } catch (error: any) {
      Dispatcher.DispatchErrorMessage(res, error);
    }
  }
  static async getRoomsByCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const rooms = await RoomService.getRoomsBYCategory(categoryId);
      Dispatcher.DispatchSuccessMessage(res, "Rooms fetched", rooms);
    } catch (error: any) {
      Dispatcher.DispatchErrorMessage(res, error);
    }
  }
  static async updateRoom(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data: RoomInterface = req.body;
      const room = await RoomService.updateRoom(id, data);
      Dispatcher.DispatchSuccessMessage(res, "Room successfully updated", room);
    } catch (error: any) {
      Dispatcher.DispatchErrorMessage(res, error);
    }
  }
}
