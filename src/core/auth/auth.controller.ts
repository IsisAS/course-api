import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const login = async (req: Request, res: Response): Promise<any> => {
    const authService = new AuthService();
    const { email, password } = req.body;

    const data = await authService.login(email, password)
    return res.send(data);
}

export const register = async (req: Request, res: Response): Promise<any> => {
    const authService = new AuthService();
    const { name, email, password, birthDate } = req.body;

    const data = await authService.register(name, email, password, birthDate)
    return res.send(data);
}