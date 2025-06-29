import { Request, Response } from "express";
import UserService from "./user.service";

export const create = async (req: Request, res: Response) => {
	const userService = new UserService();

	const props = req.body;
	const data = await userService.create(props);

	res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { id } = req.params;
	const data = await userService.findById(id);

	res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const userService = new UserService();
	const props = req.body;

	const { id } = req.params;

	const data = await userService.updateById(id, props);

	res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { id } = req.params;
	const data = await userService.deleteById(id);

	res.send(data);
};