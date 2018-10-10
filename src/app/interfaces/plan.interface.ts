import { SessionInterface } from './session.interface';

export interface PlanInterface {
    id: number;
    patient_id: number;
    pathological_conditions: string;
    note: string;
    program: string;
    final_report: string;
    privacy: string;
    medical_certificate: string;
    work_result_id: number;
    pain_id: number;
    mobility_id: number;
    sessions : SessionInterface[];
}