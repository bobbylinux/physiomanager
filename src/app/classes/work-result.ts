import { WorkResultInterface } from './../interfaces/work-result.interface';

export class WorkResult implements WorkResultInterface {
    id: number;
    description: string;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = '';
        this.enabled = false;
    }

}
