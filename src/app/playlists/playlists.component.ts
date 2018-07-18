import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyApiService } from '../shared/spotify-api.service';
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
  selectedPlaylist: number;

  constructor(private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    this.playlists = this.spotifyApiService.playlists;

    this.spotifyApiService.playlistsFetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      PlaylistsComponent._playlistsFetched = true;
    });
  }

  get playlistsFetched() {
    return PlaylistsComponent._playlistsFetched;
  }

  onSelectedPlaylistChanged(index: number) {
    this.selectedPlaylist = index;
  }
}
