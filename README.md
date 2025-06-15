# API de Plataforma de Cursos

## 📘 Visão Geral

Esta é uma API REST completa para uma plataforma de inscrição de cursos, desenvolvida em TypeScript com Node.js, Express e PostgreSQL. A API permite o cadastro de alunos, autenticação, visualização de cursos disponíveis e gerenciamento de inscrições.

## 🧰 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM moderno para TypeScript/JavaScript
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de acesso entre origens

## ⚙️ Instalação e Configuração

### ✅ Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### 🚀 Passos para Instalação

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o banco de dados PostgreSQL:**
   ```bash
   nvm use 18.19.0    
   npm install
   docker compose -f docker-compose.yml up
   npx prisma db push
   npx prisma generate
   ```

3. **Configure as variáveis de ambiente:**
   Crie ou edite o arquivo `.env`:
   ```env
   PORT=
   DB_HOST=
   DB_PORT=
   DB_DATABASE=
   DB_USER=
   DB_PASSWORD=
   JWT_SECRET=
   DATABASE_URL=schema=public"
   ```

4. **Run o projeto:**
   ```bash
   npm run dev
   ```

## 📜 Scripts Disponíveis

- `npm start` – Inicia a API (versão com pg)
- `npm run dev` – Inicia em modo desenvolvimento (pg)
- `npm run build` – Compila os arquivos TypeScript
- `npm run init` - Inicilaizar os dados do curso
- 
