import { PaymentService } from "../services/payment.service";
import { PaymentTypeService } from "../services/registers/payment-type.service";
import { PaymentTypeInterface } from './payment-type.interface';
import { PaymentInterface } from 'src/app/interfaces/payment.interface';

export interface DialogDataInterface {
  paymentService: PaymentService; 
  paymentTypes: PaymentTypeInterface[];
  payments: PaymentInterface[],
  planId: number;
  total: number;
}