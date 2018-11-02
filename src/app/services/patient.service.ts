import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Patient } from '../classes/patient';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PatientService extends DataService{

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, "http://localhost:8000/api/v1/patients");
  }

  searchPatient(lastName: string, firstName: string, taxCode: String) {
    let queryString: string = "?t="+new Date().getTime();

    if (lastName.trim() !== "") {
      queryString +="last_name="+lastName.trim()+"&";
    }

    if (firstName.trim() !== "") {
      queryString +="first_name="+firstName.trim()+"&";
    }

    if (taxCode.trim() !== "") {
      queryString +="tax_code="+taxCode.trim()+"&";
    }
    
    queryString = queryString.substring(0, queryString.length - 1);

    return super.search(queryString, "");
  }
}
