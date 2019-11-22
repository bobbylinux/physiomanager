import { Injectable } from "@angular/core";
import { Patient } from "../classes/patient";
import { PatientInterface } from "../interfaces/patient.interface";

@Injectable({
  providedIn: "root"
})
export class UtilityService {
  private patientData: PatientInterface;

  getPatientData(): PatientInterface {
    return this.patientData;
  }

  setPatientData(patientData: PatientInterface) {
    this.patientData = patientData;
  }
}
