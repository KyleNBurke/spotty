import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const accessToken = window.location.hash.split('access_token=')[1];
    //service.setAccessToken(accessToken)
    //then the service will put it in local storage

    this.router.navigate(['/playlists']);
  }

}
