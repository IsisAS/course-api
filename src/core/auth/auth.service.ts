import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { UserInterface } from "../user/user.interface";
import UserRepository from "../user/user.repository";

export default class AuthService {
    userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email: string, password: string) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }

        const user = <UserInterface>await this.userRepository
            .first({
                email: email || ""
            })
            .exec();

        if (user) {
            if (user.password !== password) {
                throw new Error("Senha incorreta");
            }

            const token = jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET as Secret, 
                { expiresIn: "1h" } 
            );

            
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: token,
            }
        }
    }
}