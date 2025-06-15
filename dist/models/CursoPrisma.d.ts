import { Curso } from '../types';
export declare class CursoModelPrisma {
    static findAll(filtro?: string): Promise<Curso[]>;
    static findById(id: number): Promise<Curso | null>;
    static findByUserId(userId: number): Promise<Curso[]>;
    static incrementInscricoes(cursoId: number): Promise<void>;
    static decrementInscricoes(cursoId: number): Promise<void>;
}
//# sourceMappingURL=CursoPrisma.d.ts.map