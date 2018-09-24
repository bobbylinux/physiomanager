import { PatientInterface } from './../interfaces/patient.interface';
import { PatientDetail } from './patient-detail';

export class Patient implements PatientInterface {
    id: number;
    last_name: string;
    first_name: string;
    tax_code: string;
    sex: string;
    birthday: string;
    place_of_birth: string;
    href: string;
    detail: PatientDetail;

    constructor() {
        this.id = 0;
        this.last_name = "";
        this.first_name = "";
        this.tax_code = "";
        this.sex = "M";
        this.birthday = "2000-01-01";
        this.place_of_birth = "";
        this.href = "";
        this.detail = new PatientDetail();
    }
}
