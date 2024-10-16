import AuthenticationService from "../../services/Authentication/authentication.service";
import { Request, Response } from "express";
import { User } from "../../interface/user";
import { comparePasswords, hashPassword } from "../../utils/functions";
export default class AuthenticationController {
    private authenticationService: AuthenticationService;
    
    constructor() {
        this.authenticationService = new AuthenticationService();
    }
    
    public registerUser = async (req: Request, res: Response) => {
        try {
        const userData: User = req.body;
        userData.password = hashPassword(userData.password);
        const newUser = await this.authenticationService.registerUser(userData);
        res.status(200).json({ data: newUser, message: "user created" });
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    };
    
    public loginUser = async (req: Request, res: Response) => {
        try {
        const userData: User = req.body;
        const user = await this.authenticationService.createToken(userData);
        res.status(200).json({ data: user, message: "user logged in successfully" });
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    };
}