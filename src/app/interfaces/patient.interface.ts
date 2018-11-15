import { PatientDetail } from '../classes/patient-detail';

export interface PatientInterface {
    id: number;
    last_name: string;
    first_name: string;
    tax_code: string;
    birthday: string;
    place_of_birth: string;
    href: string;
    detail: PatientDetail;
}