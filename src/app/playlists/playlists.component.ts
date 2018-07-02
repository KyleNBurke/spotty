import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist2 } from '../shared/playlist2.model';
import { Playlist } from './playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist2[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    /*this.spotifyService.playListsFetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });*/

    this.playlists = this.spotifyService.playlists2;
    
    this.spotifyService.playlists2Fetched.subscribe((playlists: Playlist2[]) => {
      this.playlists = playlists;
    });


  }

}
