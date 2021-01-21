import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _user: string = null;
  public _isSuperUser: boolean = false;

  constructor() {
    this.load();
  }

  load = () => {
    if (this.isValid()) {
      const user = sessionStorage.getItem("userId");

      if (user) {
        this._user = user;
      }
    }
  }

  isValid = () => {
    const user = sessionStorage.getItem("userId");

    if (!user) {
      return false;
    }

    return true;
  }

  get user(): string {
    return this._user;
  }

  set user(user: string) {
    sessionStorage.setItem("userId", user);
    this._user = user;
  }

  get IsSuperUser(): boolean {
    return this._isSuperUser;
  }

  set IsSuperUser(flag: boolean) {
    sessionStorage.setItem("isSuperUser", flag + '');
    this._isSuperUser = flag;
  }
}
