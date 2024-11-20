import Staff from "../../models/staff";
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
    // Search for the email in both User and Staff collections
    const [user, staff] = await Promise.all([
      User.findOne({ email: data.email }).exec(),
      Staff.findOne({ email: data.email }).exec(),
    ]);

    if (!user && !staff) {
      throw new Error("User or Staff not found");
    }

    const account = user || staff;
    if (data.password) {
      const isMatch = await comparePasswords(data.password, account!.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }
    }

    // Determine the role of the account
    let roleName: string;
    if (user) {
      const role = await RoleService.findById(user.role);
      if (!role) {
        throw new Error("Role not found");
      }
      roleName = role.name;
    } else {
      const role = await RoleService.findById(staff!.role);
      if (!role) {
        throw new Error("Role not found");
      }
      roleName = role.name;
    }

    // Map the role to a user-friendly string
    let userRole = "";
    switch (roleName) {
      case "admin":
        userRole = "admin";
        break;
      case "user":
        userRole = "user";
        break;
      case "receptionist":
        userRole = "receptionist";
        break;
      case "staff":
        userRole = "staff";
        break;
      default:
        userRole = "Unknown role";
        break;
    }

    const token = jsonwebtoken(
      account!._id as string,
      account!.email as string
    );

    return {
      token,
      userRole,
      username: account!.name,
    };
  }
}
