import { DisciplineInterface } from './../interfaces/discipline.interface';

export class Discipline implements DisciplineInterface {
    id: number;    
    description: string;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = "";
        this.enabled = false;
    }

}
