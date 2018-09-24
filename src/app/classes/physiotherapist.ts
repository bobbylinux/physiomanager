import {PhysiotherapistInterface} from '../interfaces/physiotherapist.interface';

export class Physiotherapist implements  PhysiotherapistInterface {
  id: number;
  last_name: string;
  first_name: string;
  enabled: boolean;
  href: string;

  constructor() {
    this.id = 0;
    this.last_name = '';
    this.first_name = '';
    this.enabled = false;
    this.href = '';
  }
}
