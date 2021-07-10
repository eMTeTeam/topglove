import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../entities/topglove.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ProductQualityApi = 'quality/v1';
  private UserApi = 'user/v1';

  constructor(private http: HttpClient) {

  }

  getProductApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductQualityApi}/${endpoint}`;
  }

  getUserApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.UserApi}/${endpoint}`;
  }

  doLogin = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('login');
    return this.http.post(url, params);
  }

  logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isSuperUser");
    localStorage.removeItem("workStation");
  }

  insertEntity = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('AddQualityDetail');
    return this.http.post(url, params);
  }

  updateEntity = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('Update');
    return this.http.post(url, params);
  }

  loadRecentSerialNo = (user: string): Observable<any> => {
    const endpoint = `GetMaxCount?user=${user}`;
    const url = this.getProductApiUrl(endpoint);
    return this.http.get(url);
  }

  loadAllEntity = (params: any): Observable<Array<any>> => {
    const url = this.getProductApiUrl('FilteredItems');
    return this.http.post<Array<any>>(url, params);
  }

  getExcelReport = (params: any): Observable<HttpResponse<ArrayBuffer>> => {
    const endpoint = 'healthmeasures/v1/generateReport';
    const url = environment.baseURL + endpoint;
    return this.http.put(url, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/octet-stream',
      }),
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }
}
