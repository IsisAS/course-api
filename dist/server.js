"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const api_routes_1 = __importDefault(require("./core/api/api.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 4000;
        this.host = process.env.HOST || "0.0.0.0";
        this.prisma = new client_1.PrismaClient();
        this.server = http_1.default.createServer(this.app);
        this.app.use((0, cors_1.default)({
            origin: '*',
            credentials: true
        }));
    }
    startServer() {
        this.server.listen(this.port, this.host, () => {
            const address = this.server.address();
            console.log('🚀 Server is running!');
            console.log('Endpoints:');
            console.log(`   API: http://${address.address}:${address.port}/api`);
        });
    }
    async init() {
        this.app.set("trust proxy", 1);
        this.app.use("/api", api_routes_1.default);
        this.startServer();
    }
}
const server = new Server();
server.init();
//# sourceMappingURL=server.js.map