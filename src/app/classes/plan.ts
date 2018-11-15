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
    sessions: SessionInterface[];
    created_at: any; 

    constructor() {
        this.id = 0;
        this.patient_id = null;
        this.pathological_conditions = '';
        this.note = '';
        this.program = '';
        this.final_report = '';
        this.privacy = '';
        this.medical_certificate = '';
        this.work_result_id = null;
        this.pain_id = null;
        this.sessions = [];
        this.created_at = null;
    }
}
