import { Router } from "express";
import * as CourseController from "./course.controller";
import { authenticateToken } from "../api/middleware/auth";

const CourseRoutes = Router();
CourseRoutes.get("/", CourseController.getAllCourses);
CourseRoutes.post("/", CourseController.create);
CourseRoutes.get("/:id", CourseController.findById);
CourseRoutes.post("/register", authenticateToken, CourseController.register);

export default CourseRoutes;