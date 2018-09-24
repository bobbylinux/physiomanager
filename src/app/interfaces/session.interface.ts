import { PhysiotherapistInterface } from "./physiotherapist.interface";
import { TherapyInterface } from "./therapy.interface";

export interface SessionInterface {
  id: number;
  plan_id: number;
  physiotherapist_id: number;
  physiotherapist: PhysiotherapistInterface;
  therapy_id: number;
  therapy: TherapyInterface;
  price: number;
  units: number;
  date: string;
  note: string;
}
