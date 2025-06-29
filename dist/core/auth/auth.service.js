"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    async login(email, password) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }
        console.log(`Tentando fazer login com email: ${email}`);
        return {
            token: ""
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map