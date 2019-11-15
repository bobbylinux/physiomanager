import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export class DataService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private auth: AuthService, private url: string) {
    this.baseUrl += url; 
  }

  public getAuthHeader(): HttpHeaders {
    let headers = new HttpHeaders(
      {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    );

    return headers;
  }

  public getAll(params?: string, query?: string) {
    let filter = '';
    if (query && query.length > 0) {
      filter = "?t=" + new Date().getTime() + "&" + query;
    } else {
      filter = "?t=" + new Date().getTime();
    }
    let include = '';
    if (params && params.length > 0) {
      if (query.length > 0) {
        include = "&include=" + params;
      } else {
        include = "?t=" + new Date().getTime() + "&include=" + params;
      }
    }
    return this.httpClient.get(this.baseUrl + filter + include, { headers: this.getAuthHeader() });
  }

  public get(id: number, params: string) {
    let include = '';
    if (params.length > 0) {
      include = '?include=' + params;
    }
    return this.httpClient.get(this.baseUrl + '/' + id + include, { headers: this.getAuthHeader() });
  }

  public search(queryParams: string, includeParams: string) {
    let queryString = '';
    let includeString = '';
    if (queryParams.length > 0) {
      queryString = '?' + queryParams;
    }
    if (includeParams.length > 0) {
      includeString = '&include=' + includeParams;
    }
    return this.httpClient.get(this.baseUrl + '/' + queryString + includeString, { headers: this.getAuthHeader() });
  }

  public create(resource: any) {
    return this.httpClient.post(this.baseUrl.toString(), resource, { headers: this.getAuthHeader() });
  }

  public update(resource: any) {
    return this.httpClient.put(this.baseUrl.toString() + '/' + resource.id, resource, { headers: this.getAuthHeader() });
  }

  public delete(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id, { headers: this.getAuthHeader() });
  }
}
