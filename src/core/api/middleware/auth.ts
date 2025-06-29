import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  console.log("🔐 Token recebido:", token);
  console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    (req as any).user = user;
    next();
  });
};

