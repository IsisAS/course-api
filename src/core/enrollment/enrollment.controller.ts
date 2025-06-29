import { Request, Response } from "express";
import EnrollmentService from "./enrollment.service";

export const getAllEnrollments = async (req: Request, res: Response): Promise<any> => {
    const enrollmentService = new EnrollmentService();
    const data = await enrollmentService.getAll();

    return res.send(data);
}

export const create = async (req: Request, res: Response): Promise<any> => {
    const enrollmentService = new EnrollmentService();

    const props = req.body;
    await enrollmentService.create(props);

    res.status(201).send({ message: "Inscrição criada com sucesso!" });
}