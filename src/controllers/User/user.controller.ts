import { AuthenticatedRequest, CustomRequest } from "../../interface/custom-request";
import UserService from "../../services/User/user.service";
import { Request, Response } from "express";
import dispatcher from "../../utils/dispatcher";
export default class UserController {
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const request = req as AuthenticatedRequest;

      // Check if the user is authenticated
      if (!request.user) {
        dispatcher.DispatchErrorMessage(res, "Token expired or invalid");
        return; 
      }

      const { password, passwordResetOtp, ...userData } = request.user;
      
      dispatcher.DispatchSuccessMessage(res, "User retrieved", userData);
      return; 
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }
}