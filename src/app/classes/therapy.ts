import { TherapyInterface } from '../interfaces/therapy.interface';

export class Therapy implements TherapyInterface {
  id: number;
  description: string;
  enabled: boolean;
  price: number;

  constructor() {
    this.id = 0;
    this.description = '';
    this.enabled = false;
    this.price = 0.00;
  }
}
