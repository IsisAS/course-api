import { Router } from "express";
import * as UserController from "./user.controller";
const UserRoutes = Router();

UserRoutes.post("/", UserController.create);

export default UserRoutes;