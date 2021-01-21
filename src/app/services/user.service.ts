import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _user: string = null;

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
    const user = sessionStorage.getItem("userId"); // TODO:: local storage session

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
}
