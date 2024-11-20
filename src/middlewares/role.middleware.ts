import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interface/custom-request";
import dispatcher from "../utils/dispatcher";

const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const request = req as AuthenticatedRequest;
    const userData = request.user;

    // Check if the user has the correct role
    if (!roles.includes(userData.role.name)) {
      // Send unauthorized response but don't return it directly
      dispatcher.SendUnAuthorizedMessage(res);
      return; 
    }

    // Proceed to the next middleware if authorized
    next();
  };
};

export default roleMiddleware;
