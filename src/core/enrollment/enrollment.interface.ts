import { CourseInterface } from "../course/course.interface";
import { UserInterface } from "../user/user.interface";

export interface EnrollmentInterface {
    id?: string;
    userId: string;
    courseId: string;
    isEnrollmentCanceled: boolean;
    isEnrolled: boolean;

    user?: UserInterface;
    course?: CourseInterface;
}