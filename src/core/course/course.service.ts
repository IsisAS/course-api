import BaseService from "../../base/base.service";
import { EnrollmentInterface } from "../enrollment/enrollment.interface";
import EnrollmentService from "../enrollment/enrollment.service";
import { CourseInterface } from "./course.interface";
import CourseRepository from "./course.repository";

export default class CourseService extends BaseService<CourseInterface> {
    enrollmentsService: EnrollmentService;
    constructor() {
        super(CourseRepository);
        this.enrollmentsService = new EnrollmentService();
    }

    async register(props: EnrollmentInterface): Promise<EnrollmentInterface | undefined> {
        const data = await this.enrollmentsService.create({
            courseId: props.courseId,
            userId: props.userId,
            isEnrollmentCanceled: false,
            isEnrolled: true,
        });

        return data;
    }

}