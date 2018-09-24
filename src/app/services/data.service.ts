import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {
  private url: String;

  constructor(private httpClient: HttpClient, url: string) {
    this.url = url;
  }

  public getAll(params: string) {
    let include = '';
    if (params.length > 0) {
      include = '?include=' + params;
    }
    return this.httpClient.get(this.url + include);
  }

  public get(id: number, params: string) {
    let include = '';
    if (params.length > 0) {
      include = '?include=' + params;
    }
    return this.httpClient.get(this.url + '/' + id + include);
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
    return this.httpClient.get(this.url + '/' + queryString + includeString);
  }

  public create(resource: any) {
    return this.httpClient.post(this.url.toString(), resource);
  }

  public update(resource: any) {
    return this.httpClient.put(this.url.toString() + '/' + resource.id, resource);
  }

  public delete(id) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
