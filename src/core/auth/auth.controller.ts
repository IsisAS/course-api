import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const login = async (req: Request, res: Response) => {
    const authService = new AuthService();
    const { email, password } = req.body;

    await authService.login(email, password)
}

export const register = async (req: Request, res: Response) => {
    const authService = new AuthService();
    const { name, email, password, birthDate } = req.body;

    await authService.register(name, email, password, birthDate)
}