import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MobilityService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8000/api/v1/mobilities');
  }
}
