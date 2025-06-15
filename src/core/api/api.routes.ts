import express, { Router } from "express";
import AuthRoutes from "../auth/auth.routes";

const ApiRoutes = Router();
ApiRoutes.use(express.urlencoded({ extended: true }));
ApiRoutes.use(express.json({ limit: "10mb" }));

ApiRoutes.use('/auth', AuthRoutes);


export default ApiRoutes;