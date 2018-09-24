import { Injectable } from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TherapyService  extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8000/api/v1/therapies');
  }
}
