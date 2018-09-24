import { PatientDetailInterface } from '../interfaces/patient-detail.interface';

export class PatientDetail implements PatientDetailInterface {
    address: string;
    city: string;
    phone_number: string;
    email: string;

    constructor() {
        this.address = '';
        this.city = '';
        this.phone_number = '';
        this.email = '';
    }
}
