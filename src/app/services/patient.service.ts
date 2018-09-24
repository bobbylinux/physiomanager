import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Patient } from '../classes/patient';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PatientService extends DataService{

  constructor(httpClient: HttpClient) {
    super(httpClient, "http://localhost:8000/api/v1/patients");
  }

  searchPatient(lastName: string, firstName: string, taxCode: String) {
    let queryString: string = "";

    if (firstName.trim() !== "") {
      queryString +="first_name="+firstName.trim()+"&";
    }

    if (lastName.trim() !== "") {
      queryString +="last_name="+lastName.trim()+"&";
    }

    if (taxCode.trim() !== "") {
      queryString +="tax_code="+taxCode.trim()+"&";
    }
    return super.search(queryString, "");
  }
}
