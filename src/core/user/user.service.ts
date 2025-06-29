import { UserInterface } from "./user.interface";
import BaseService from "../../base/base.service";
import UserRepository from "./user.repository";
import { id } from "../../base/repositories/base.repository";

export default class UserService extends BaseService<UserInterface> {
    constructor() {
        super(UserRepository);
    }

    async create(props: UserInterface): Promise<UserInterface | undefined> {
        props.birthDate = new Date(props.birthDate);

        return <UserInterface>await this.repository.create(props);
    }

    async findById(id: id | string | undefined): Promise<UserInterface | UserInterface[]> {
        const data = <UserInterface>await this.repository.findById(id).with("enrollments.course").exec();

        const courseList = {
            ...data,
            course: data.enrollments?.flatMap((enrollment) => {
                return enrollment.course;
            })
        }
        return courseList
    }
}