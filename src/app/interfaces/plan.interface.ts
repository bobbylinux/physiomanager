import { SessionInterface } from './session.interface';

export interface PlanInterface {
    id: number;
    patient_id: number;
    pathological_conditions: string;
    note: string;
    program: string;
    final_report: string;
    privacy: boolean;
    medical_certificate: boolean;
    work_result_id: number;
    pain_id: number;
    sessions : SessionInterface[];
    created_at: any;
}