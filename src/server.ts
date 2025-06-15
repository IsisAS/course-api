import { PrismaClient } from "@prisma/client";
import cors from 'cors';
import express, { Express } from "express";
import http, { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { AddressInfo } from "net";
import ApiRoutes from "./core/api/api.routes";

class Server {
    private app: Express;
    private server: HttpsServer | HttpServer;
    private port: number;
    private host: string;
    prisma: PrismaClient;


    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 4000;
        this.host = process.env.HOST || "0.0.0.0";
        this.prisma = new PrismaClient();
        this.server = http.createServer(this.app);

        this.app.use(cors({
            origin: '*',
            credentials: true
        }));
    }

    startServer() {
        this.server.listen(this.port, this.host, () => {
            const address = this.server.address() as AddressInfo;
            console.log('🚀 Server is running!');
            console.log('Endpoints:');
            console.log(`   API: http://${address.address}:${address.port}/api`);
        });
    }

    async init() {
        this.app.set("trust proxy", 1);
        this.app.use("/api", ApiRoutes);
        this.startServer();
    }
}

const server = new Server();
server.init();