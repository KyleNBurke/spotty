import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authorized: boolean = false;
  private _accessToken: string;

  constructor() {
    const accessToken = window.localStorage.getItem('accessToken');

    if(accessToken !== null) {
      this._accessToken = accessToken;
      this._authorized = true;
    }
  }

  get authorized(): boolean {
    return this._authorized;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
    window.localStorage.setItem('accessToken', this._accessToken);
    this._authorized = true;
    //emit...
  }
}
