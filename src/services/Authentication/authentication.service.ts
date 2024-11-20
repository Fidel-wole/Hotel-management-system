import User from "../../models/user";
import { comparePasswords, jsonwebtoken } from "../../utils/functions";
import RoleService from "../Role/role.service";

export default class AuthenticationService {
  static async registerUser(user: any) {
    try {
      const existingUser = await User.findOne({
        $or: [{ email: user.email }, { username: user.username }],
      });
      if (existingUser) {
        throw new Error("User with this email or username already exists");
      }
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error: any) {
      throw error;
    }
  }

  static async createToken(data: { email: string; password?: any }) {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (data.password !== undefined) {
      const isMatch = await comparePasswords(data.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid password");
      }
    }
    const role = await RoleService.findById(user.role);

    if (!role) {
      throw new Error("Role not found");
    }
    
    let userRole = "";
    
    switch (role.name) {
      case "admin":
        userRole = "admin";
        break;
    
      case "user":
        userRole = "user";
        break;
    
      case "receptionist":
        userRole = "receptionist";
        break;
    
      default:
        userRole = "Unknown role";
        break;
    }
    


    const token = jsonwebtoken(user._id as string, user.email as string);

    return { token, userRole, username: user.username };
  }
}
