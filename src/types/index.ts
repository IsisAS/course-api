export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  nascimento: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Curso {
  id?: number;
  nome: string;
  descricao?: string;
  capa?: string;
  inscricoes?: number;
  inicio: string;
  inscrito?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Inscricao {
  id?: number;
  usuario_id: number;
  curso_id: number;
  inscricao_cancelada?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CreateUserRequest {
  nome: string;
  email: string;
  senha: string;
  nascimento: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  message?: string;
}

