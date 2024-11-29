import Room from "../../models/room";
import { Room as RoomInterface } from "../../interface/room";
export default class RoomService {
  static async createRoom(data: RoomInterface) {
    const room = new Room(data);
    await room.save();
    return room;
  }

  static async getRooms() {
    return Room.find().populate("category", "name");
  }

  static async getRoomById(id: string) {
    return Room.findById(id).populate("category", "name");
  }

  static getRoomsBYCategory(categoryId: string) {
    return Room.find({ category: categoryId }).populate("category", "name");
  }

  static async updateRoom(id: any, data: any) {
    const room = await Room.findByIdAndUpdate(id, data, { new: true });
    return room;
}

}