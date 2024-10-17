import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dispatcher from "../utils/dispatcher";
import { JWT_ACCESS_SECRET } from "../configs/env";
import { CustomRequest } from "../interface/custom-request";
import UserService from "../services/User/user.service";

const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => { 
  const authHeader = req.headers.authorization;

  // Check if authorization header is present
  if (!authHeader) {
    dispatcher.SendUnAuthorizedMessage(res);
    return;  // Return to stop further execution
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decodedUser = jwt.verify(token, JWT_ACCESS_SECRET!) as JwtPayload;

    // Check if the decoded user exists
    if (!decodedUser) {
      dispatcher.SendUnAuthorizedMessage(res);
      return;  // Return to stop further execution
    }

    // Fetch the user from the database
    const user = await UserService.getUserById(decodedUser.userId);
    
    // Attach user information to the request object
    (req as CustomRequest).userId = decodedUser.userId;
    (req as CustomRequest).email = decodedUser.email;
    (req as CustomRequest).user = (user)?.toJSON();

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.log(err);
    dispatcher.SendUnAuthorizedMessage(res);
    return;  // Return to stop further execution
  }
};

export default authMiddleWare;
