import { DoctorInterface } from './../interfaces/doctor.interface';

export class Doctor implements DoctorInterface {
    id: number;
    last_name: string;
    first_name: string;
    enabled: boolean;

    constructor() {
        this.id = null;
        this.last_name = "";
        this.first_name = "";
        this.enabled = false;
    }

}
