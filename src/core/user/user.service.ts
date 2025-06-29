import { UserInterface } from "./user.interface";
import BaseService from "../../base/base.service";
import UserRepository from "./user.repository";

export default class UserService extends BaseService<UserInterface> {
    constructor() {
        super(UserRepository);
    }

    async create(props: UserInterface): Promise<UserInterface | undefined> {
        props.birthDate = new Date(props.birthDate);

        return <UserInterface>await this.repository.create(props);
    }
}