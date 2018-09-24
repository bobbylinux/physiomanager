import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class WorkResultService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8000/api/v1/work_results');
  }
}
