import { Router } from "express";
import * as EnrollmentController from "./enrollment.controller";

const EnrollmentRoutes = Router();

EnrollmentRoutes.get("/", EnrollmentController.getAllEnrollments);
EnrollmentRoutes.post("/", EnrollmentController.create);