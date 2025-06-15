import { PrismaClient } from "@prisma/client";
import { ICourseInterface } from "./course.interface";

export class CourseService {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCourses(): Promise<ICourseInterface[]> {
        const courses = await this.prisma.course.findMany(
            {
                include: {
                    userEnrollments: true
                }
            });

        return courses.map((course) => ({
            id: course.id,
            name: course.name,
            description: course.description ?? "",
            cover: course.cover ?? "",
            enrollmentsCount: course.userEnrollments.length,
            startDate: course.startDate ?? undefined,
            isEnrolled: course.isEnrolled,
            enrollmentCanceled: course.enrollmentCancelled,
        }));
    }

    async registerInCourse(courseId: string, userId: string): Promise<ICourseInterface | undefined> {
        return undefined;
    }
}