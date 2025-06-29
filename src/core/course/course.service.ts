import BaseService from "../../base/base.service";
import { CourseInterface } from "./course.interface";
import CourseRepository from "./course.repository";

export default class CourseService extends BaseService<CourseInterface> {
    constructor() {
        super(CourseRepository);
    }

}