import { MobilityInterface } from './../interfaces/mobility.interface';

export class Mobility implements MobilityInterface {
    id: number;
    description: string;
    index: number;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = ''
        this.index = 0;
        this.enabled = false;
    }

}
