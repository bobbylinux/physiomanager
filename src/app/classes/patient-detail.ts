import { PatientDetailInterface } from '../interfaces/patient-detail.interface';

export class PatientDetail implements PatientDetailInterface {
    address: string;
    city: string;
    phone_number: string;
    email: string;
    doctor_id: number;

    constructor() {
        this.address = '';
        this.city = '';
        this.phone_number = '';
        this.email = '';
        this.doctor_id = 0;
    }
}
