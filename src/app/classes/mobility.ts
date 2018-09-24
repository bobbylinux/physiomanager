import { MobilityInterface } from './../interfaces/mobility.interface';

export class Mobility implements MobilityInterface {
    id: number;
    description: string;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = ''
        this.enabled = false;
    }

}
