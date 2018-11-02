import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../data.service';
import { AuthService } from './../auth.service';

@Injectable()
export class PainService extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth,'http://localhost:8000/api/v1/pains');
  }
}
