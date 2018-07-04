import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist } from '../shared/playlist.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  static _playlistsFetched = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.playlists = this.spotifyService.playlists;

    this.spotifyService.playlistsFetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      PlaylistsComponent._playlistsFetched = true;
    });
  }

  get playlistsFetched() {
    return PlaylistsComponent._playlistsFetched;
  }

}
