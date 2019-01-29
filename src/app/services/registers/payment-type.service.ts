import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentTypeService  extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, 'api/v1/payment_types');
  }
}

