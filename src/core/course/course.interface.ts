export interface ICourseInterface {
    id: string;
    name: string;
    description: string;
    cover: string;
    enrollmentsCount: number;
    startDate?: Date;
    isEnrolled: boolean;
    enrollmentCanceled?: boolean;
    userEnrollments?: any
}