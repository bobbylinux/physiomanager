import { DisciplineInterface } from './discipline.interface';

export interface DoctorInterface {
    id: number;
    last_name: string;
    first_name: string;
    enabled: boolean;
    discipline_id: number;
}
