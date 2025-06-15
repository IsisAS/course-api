import { Router } from "express";
import * as CourseController from "./course.controller";

const CourseRoutes = Router();
CourseRoutes.get("/", CourseController.getAllCourses);
CourseRoutes.post("/register", CourseController.registerCourse);

export default CourseRoutes;