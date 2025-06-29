import { Router } from "express";
import * as AuthController from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthController.login);


export default AuthRoutes;  