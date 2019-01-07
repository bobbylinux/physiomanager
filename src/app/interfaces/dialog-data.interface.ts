import { PaymentService } from "../services/payment.service";
import { PaymentTypeService } from "../services/registers/payment-type.service";

export interface DialogDataInterface {
  paymentService: PaymentService; 
  paymentTypeSerive: PaymentTypeService;
  planId: number;
}