import BaseService from "../../base/base.service";
import { EnrollmentInterface } from "./enrollment.interface";
import EnrollmentRepository from "./enrollment.repository";

export default class EnrollmentService extends BaseService<EnrollmentInterface> {
    constructor() {
        super(EnrollmentRepository)
    }
}   