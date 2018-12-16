import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentTypeService  extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, 'http://localhost:8000/api/v1/payment_types');
  }
}

