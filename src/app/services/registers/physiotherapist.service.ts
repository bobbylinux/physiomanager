import { Injectable } from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './../auth.service';

@Injectable()
export class PhysiotherapistService extends DataService{

  constructor(httpClient: HttpClient, auth: AuthService) {
    super(httpClient, auth, 'api/v1/physiotherapists');
  }
}
