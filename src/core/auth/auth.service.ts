export default class AuthService {
    async login(email: string, password: string): Promise<{ token: string }> {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }
        console.log(`Tentando fazer login com email: ${email}`);
        return {
            token: ""
        }
    }
}