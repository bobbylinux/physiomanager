import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class MobilityService extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, 'http://localhost:8000/api/v1/mobilities');
  }
}
