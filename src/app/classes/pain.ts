import { PainInterface } from './../interfaces/pain.interface';

export class Pain implements PainInterface {
    id: number;
    description: string;
    index: number;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = '';
        this.index = 0;
        this.enabled = false;
    }

}
