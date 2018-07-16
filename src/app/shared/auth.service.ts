import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorized: boolean = false;
  private _accessToken: string;

  constructor() {
    const accessTokenStorage = window.localStorage.getItem('accessToken');

    if(accessTokenStorage !== null) {
      this._accessToken = accessTokenStorage;
      this.authorized = true;
      return;
    }

    const accessTokenHash = window.location.hash.split('access_token=');
    
    if(accessTokenHash.length === 2) {
      const accessToken = accessTokenHash[1].split('&')[0];
      this.setAccessToken(accessToken);
    }
  }

  get accessToken(): string {
    return this._accessToken;
  }

  setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
    window.localStorage.setItem('accessToken', this._accessToken);
    this.authorized = true;
  }

  removeAccessToken() {
    window.localStorage.removeItem('accessToken');
  }
}
