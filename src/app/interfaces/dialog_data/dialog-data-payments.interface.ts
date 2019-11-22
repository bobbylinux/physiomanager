import { PaymentInterface } from "src/app/interfaces/payment.interface";
import { PaymentService } from "src/app/services/payment.service";
import { PaymentTypeInterface } from "../payment-type.interface";

export interface DialogDataPaymentsInterface {
  paymentService: PaymentService;
  paymentTypes: PaymentTypeInterface[];
  payments: PaymentInterface[];
  planId: number;
  create_at: string;
  note: string;
  total: number;
}
