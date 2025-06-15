import { Usuario } from '../types';
export declare class UsuarioModelPrisma {
    static create(userData: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>): Promise<Usuario>;
    static findByEmail(email: string): Promise<Usuario | null>;
    static findById(id: number): Promise<Usuario | null>;
    static validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
//# sourceMappingURL=UsuarioPrisma.d.ts.map