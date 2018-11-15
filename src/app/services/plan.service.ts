import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PlanService extends DataService {

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, "http://localhost:8000/api/v1/plans");
  }

  searchPlan(patient_id: string) {
    let queryString: string = "patient_id="+patient_id.toString();
    let includeString = "work_result,pain,patient,sessions";
    return super.search(queryString, includeString);
  }
}
