import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist } from './playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.playListsFetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });

    //this.spotifyService.getPlaylists();
  }

}
