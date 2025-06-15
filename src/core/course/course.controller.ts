import { Request, Response } from "express";
import { CourseService } from "./course.service";

export const getAllCourses = async (req: Request, res: Response): Promise<any> => {
    const courseService = new CourseService();
    const data = await courseService.getAllCourses();

    return res.send(data);
}

export const registerCourse = async (req: Request, res: Response): Promise<any> => {
    const courseService = new CourseService();
    const { courseId, userId } = req.body;

    const data = await courseService.registerInCourse(courseId, userId);
    return res.send(data);
}