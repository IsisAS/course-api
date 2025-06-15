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

3. **Execute o script de inicialização do banco:**
   ```bash
   sudo -u postgres psql -d curso_platform -f database.sql
   ```

4. **Configure as variáveis de ambiente:**
   Crie ou edite o arquivo `.env`:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=curso_platform
   DB_USER=postgres
   DB_PASSWORD=postgres
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/curso_platform?schema=public"
   ```

5. **Gere o cliente Prisma:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Compile o projeto:**
   ```bash
   npm run build
   ```

## 📜 Scripts Disponíveis

- `npm start` – Inicia a API (versão com pg)
- `npm run start:prisma` – Inicia a API com Prisma
- `npm run dev` – Inicia em modo desenvolvimento (pg)
- `npm run dev:prisma` – Inicia em modo desenvolvimento (Prisma)
- `npm run build` – Compila os arquivos TypeScript
- `npx prisma generate` – Gera o client do Prisma
- `npx prisma db push` – Aplica o schema no banco de dados
