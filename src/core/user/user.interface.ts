import { EnrollmentInterface } from "../enrollment/enrollment.interface";

export interface UserInterface{
    id?: number;
    name: string;
    email: string;
    password: string;
    birthDate: Date;

    enrollments?: EnrollmentInterface[]
}