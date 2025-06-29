import { Router } from "express";
import * as UserController from "./user.controller";
const UserRoutes = Router();

UserRoutes.post("/", UserController.create);
UserRoutes.get("/:id", UserController.findById);

export default UserRoutes;