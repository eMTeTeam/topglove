import { Injectable } from '@angular/core';
import { AuthCookie } from './auth-cookie-handler';
import { User } from '../entities/user';
import { Previlages } from '../entities/previleges';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User = null;
  private _previlages: Previlages = null;

  constructor(private authCookie: AuthCookie,
    private apiService: ApiService) {
    this.load();
  }

  load = () => {
    if (this.isValid()) {
      this.apiService.getMyPrevilige().subscribe(res => {
        this._previlages = res;
      });

      this.apiService.getMyUserInfo().subscribe(res => {
        this._user = res;
      });
    }
  }

  isValid = () => {
    const token = this.authCookie.getToken();

    if (!token) {
      return false;
    }

    return true;
  }

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  get previlages(): Previlages {
    return this._previlages;
  }

  set previlages(previlages: Previlages) {
    this._previlages = previlages;
  }
}
