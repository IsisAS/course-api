import { Request, Response } from "express";
import CourseService from "./course.service";

export const getAllCourses = async (req: Request, res: Response): Promise<any> => {
	const courseService = new CourseService();
	const data = await courseService.getAll();

	return res.send(data);
}

export const create = async (req: Request, res: Response) => {
	const courseService = new CourseService();

	const props = req.body;
	await courseService.create(props);

	res.status(201).send({ message: "Curso criado com sucesso!" });
};

export const findById = async (req: Request, res: Response): Promise<any> => {
	const courseService = new CourseService();

	const { id } = req.params;
	const data = await courseService.findById(id);

	return res.send(data);
};