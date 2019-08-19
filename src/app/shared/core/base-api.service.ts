import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApiService {
  private baseUrl = 'api/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ``): string {
    console.log(this.baseUrl + url);
    return this.baseUrl + url;
  }

  public get(url: string = ``): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = ``, data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, this.httpOptions  );
  }

  public put(url: string = ``, data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data, this.httpOptions);
  }

  public delete(url: string = ``): Observable<any> {
    return this.http.delete(this.getUrl(url), this.httpOptions);
  }
}
