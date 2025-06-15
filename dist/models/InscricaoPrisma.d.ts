import { Inscricao } from '../types';
export declare class InscricaoModelPrisma {
    static create(usuarioId: number, cursoId: number): Promise<Inscricao>;
    static findByUserAndCourse(usuarioId: number, cursoId: number): Promise<Inscricao | null>;
    static cancelInscricao(usuarioId: number, cursoId: number): Promise<boolean>;
    static reativarInscricao(usuarioId: number, cursoId: number): Promise<boolean>;
    static isUserEnrolled(usuarioId: number, cursoId: number): Promise<boolean>;
}
//# sourceMappingURL=InscricaoPrisma.d.ts.map