import User from "../../models/user";
import { comparePasswords, jsonwebtoken } from "../../utils/functions";

export default class AuthenticationService {
  public async registerUser(user: any) {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public async createToken(data: { email: string; password?: any }) {
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

    const token = jsonwebtoken(user._id as string, user.email as string);

    return { token, username: user.username };
  }
}

