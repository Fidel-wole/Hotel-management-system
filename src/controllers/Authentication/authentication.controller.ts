import AuthenticationService from "../../services/Authentication/authentication.service";
import { Request, Response } from "express";
import { User } from "../../interface/user";
import { comparePasswords, hashPassword } from "../../utils/functions";
import RoleService from "../../services/Role/role.service";

export default class AuthenticationController {
  static async registerUser(req: Request, res: Response) {
    try {
      const role = await RoleService.findByName("user");

      if (!role) {
        throw new Error("Role 'user' not found");
      }

      const userData: User = req.body;
      userData.role = role;
      userData.password = hashPassword(userData.password);

      const newUser = await AuthenticationService.registerUser(userData);
      res.status(200).json({ data: newUser, message: "user created" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const user = await AuthenticationService.createToken(userData);
      res
        .status(200)
        .json({ data: user, message: "user logged in successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
