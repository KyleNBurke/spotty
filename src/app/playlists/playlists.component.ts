import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { Playlist } from '../shared/playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[];
  private selectedPlaylist: number;

  constructor(private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    this.spotifyApiService.playlistsFetched.subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

  onPlaylistClick(index: number) {
    this.selectedPlaylist = index;
  }
}
