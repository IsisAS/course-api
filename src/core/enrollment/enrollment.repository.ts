import BaseRepository from "../../base/repositories/base.repository";
import { EnrollmentInterface } from "./enrollment.interface";

export default class EnrollmentRepository extends BaseRepository<EnrollmentInterface> {
    constructor() {
        super('enrollment');
    }
}