import { PainInterface } from './../interfaces/pain.interface';

export class Pain implements PainInterface {
    id: number;
    description: string;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = '';
        this.enabled = false;
    }

}
