import express, { Router } from "express";
import AuthRoutes from "../auth/auth.routes";
import CourseRoutes from "../course/course.routes";

const ApiRoutes = Router();
ApiRoutes.use(express.urlencoded({ extended: true }));
ApiRoutes.use(express.json({ limit: "10mb" }));

ApiRoutes.use('/auth', AuthRoutes);
ApiRoutes.use('/courses', CourseRoutes);


export default ApiRoutes;