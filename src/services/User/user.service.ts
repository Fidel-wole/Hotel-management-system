import User from "../../models/user";

export default class UserService {
  static async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
