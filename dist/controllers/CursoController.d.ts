import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    userId?: number;
}
export declare class CursoController {
    static listarCursos(req: Request, res: Response): Promise<void>;
    static fazerInscricao(req: AuthenticatedRequest, res: Response): Promise<void>;
    static cancelarInscricao(req: AuthenticatedRequest, res: Response): Promise<void>;
    static listarCursosInscritos(req: AuthenticatedRequest, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=CursoController.d.ts.map