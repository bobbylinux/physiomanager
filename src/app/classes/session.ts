import { SessionInterface } from '../interfaces/session.interface';
import {TherapyInterface} from '../interfaces/therapy.interface';
import { PhysiotherapistInterface } from './../interfaces/physiotherapist.interface';

export class Session implements SessionInterface {
  id: number;
  plan_id: number;
  physiotherapist_id: number;
  physiotherapist: PhysiotherapistInterface;
  therapy_id: number;
  therapy: TherapyInterface;
  price: number;
  units: number;
  note: string;
  date: string;

  constructor() {
    this.id = 0;
    this.plan_id = 0;
    this.physiotherapist_id = 0;
    this.therapy_id = 0;
    this.units = 1;
    this.note = '';
    this.date = '01/01/1900';
  }
}
