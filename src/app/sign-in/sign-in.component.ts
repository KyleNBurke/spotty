import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private endpoint: string = 'https://accounts.spotify.com/authorize';
  private clientId: string = 'e2eadaaaab634e10b4c6943adcc1bc61';
  private responseType: string = 'token';
  private redirectURI: string = 'http://localhost:4200/redirect';

  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit() {
  }

  onSignIn() {
    this.document.location.href = this.endpoint +
      '?client_id=' + this.clientId +
      '&response_type=' + this.responseType +
      '&redirect_uri=' + this.redirectURI;
  }

}
