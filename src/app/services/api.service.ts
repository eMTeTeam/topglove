import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  doLogin = (params: any): Observable<any> => {
    const endpoint = 'users/v1/login';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isSuperUser");
  }

  saveEntity = (params: any): Observable<any> => {
    const endpoint = 'users/v1/signUp';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  loadRecentSerialNo = (): Observable<any> => {
    const endpoint = 'Teams/v1/allTeams';
    const url = environment.baseURL + endpoint;
    return this.http.get<Array<any>>(url);
  }

  loadAllEntity = (params: any): Observable<Array<any>> => {
    const endpoint = 'users/v1/signUp';
    const url = environment.baseURL + endpoint;
    return this.http.post<Array<any>>(url, params);
  }

  loadDashboardData = (params: any): Observable<any> => {
    const endpoint = 'users/v1/signUp';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
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
