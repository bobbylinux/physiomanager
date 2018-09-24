import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlanService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient, "http://localhost:8000/api/v1/plans");
  }

  searchPlan(patient_id: string) {
    let queryString: string = patient_id.toString();
    let includeString = "work_result,pain,mobility,patient,sessions";
    return super.search(queryString, includeString);
  }
}
