import { WorkResultInterface } from './../interfaces/work-result.interface';

export class WorkResult implements WorkResultInterface {
    id: number;
    description: string;
    index: number;
    enabled: boolean;

    constructor() {
        this.id = null;
        this.description = '';
        this.index = 0;
        this.enabled = false;
    }

}
