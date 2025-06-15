export class AuthService {

    async login(email: string, password: string): Promise<{ token: string }> {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }
        console.log(`Tentando fazer login com email: ${email}`);
        return {
            token: ""
        }
    }

    async register(name: string, email: string, password: string, birthDate: Date): Promise<void> {
        // Implement registration logic here
        
    }
}