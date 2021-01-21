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
    return this.http.post(url, params, { responseType: 'text' });
  }

  doRegister = (params: any): Observable<any> => {
    const endpoint = 'Organizations/v1';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params, { responseType: 'text' });
  }

  logout = () => {
    // call api to logout
  }

  saveUserDetails = (params: any) => {

  }

  getMemberList = (teamId: any): Observable<any> => {
    const endpoint = 'Teams/v1/' + teamId + '/members';
    const url = environment.baseURL + endpoint;
    return this.http.get<Array<any>>(url);
  }

  getGroups = (): Observable<any> => {
    const endpoint = 'Teams/v1/allTeams';
    const url = environment.baseURL + endpoint;
    return this.http.get<Array<any>>(url);
  }

  removeMember = (teamId: any, userId: any): Observable<any> => {
    const endpoint = 'Teams/v1/remove/' + userId + '?teamId=' + teamId;
    const url = environment.baseURL + endpoint;
    return this.http.put(url, null);
  }

  addMemberToTeam = (params: any): Observable<any> => {
    const endpoint = 'users/v1/signUp';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params, { responseType: 'text' });
  }

  shareGroup = (params: any) => {

  }

  getDashboardReport = (params: any): Observable<any> => {
    const endpoint = 'healthmeasures/v1/getDashBoardData';
    const url = environment.baseURL + endpoint;
    return this.http.put(url, params);
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

  saveGroup = (params: any): Observable<any> => {
    const endpoint = 'Teams/v1';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  getMyUserInfo = (): Observable<any> => {
    const endpoint = 'users/v1/myDetail'
    const url = environment.baseURL + endpoint;
    return this.http.get(url);
  }

  getSettingsInfo = () => {

  }

  getTodayTimings = () => {

  }

  saveTodayTimings = (params: any) => {

  }

  getMyPrevilige = (): Observable<any> => {
    const endpoint = 'users/v1/previleges'
    const url = environment.baseURL + endpoint;
    return this.http.get(url);
  }

  getTodaySlotInfo = (params: any): Observable<any> => {
    const endpoint = 'HealthMeasures/v1/getDayMeasure?datetime=' + params;
    const url = environment.baseURL + endpoint;
    return this.http.get(url);
  }

  saveTempratureSlot = (params: any): Observable<any> => {
    const endpoint = 'healthmeasures/v1/createOrUpdate';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  loadGroupInfo = (groupId: string): Observable<any> => {
    const endpoint = 'teams/v1/getTeam/'
    const url = environment.baseURL + endpoint + groupId;
    return this.http.get(url);
  }
}
