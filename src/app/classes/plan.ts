import { PlanInterface } from './../interfaces/plan.interface';
import { SessionInterface } from './../interfaces/session.interface';

export class Plan implements PlanInterface  {
    id: number;
    patient_id: number;
    pathological_conditions: string;
    note: string;
    program: string;
    final_report: string;
    privacy: string;
    medical_certificate: string;
    work_result_id : number;
    pain_id : number;
    mobility_id : number;
    sessions: SessionInterface[];

    constructor() {
        this.id = 0;
        this.patient_id = 0;
        this.pathological_conditions = '';
        this.note = '';
        this.program = '';
        this.final_report = '';
        this.privacy = '';
        this.medical_certificate = '';
        this.work_result_id = 0;
        this.pain_id = 0;
        this.mobility_id = 0;
        this.sessions = [];
    }
}
