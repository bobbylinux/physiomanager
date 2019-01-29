import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../data.service';
import { AuthService } from '../auth.service';

@Injectable()
export class DoctorService extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, 'api/v1/doctors');
  }
}
