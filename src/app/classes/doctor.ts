import { DoctorInterface } from './../interfaces/doctor.interface';
import { Discipline } from './discipline';

export class Doctor implements DoctorInterface {
    id: number;
    last_name: string;
    first_name: string;
    discipline_id: number;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.last_name = "";
        this.first_name = "";
        this.discipline_id = 0;
        this.enabled = false;
    }

}
