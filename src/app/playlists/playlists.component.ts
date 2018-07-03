import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist } from '../shared/playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.playlists = this.spotifyService.playlists;
    
    this.spotifyService.playlists2Fetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

}
