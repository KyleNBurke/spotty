import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { ListType } from '../shared/listType';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private ListType = ListType;
  private playlist: Playlist;
  private playlistIndex: number;
  private displayColumns: string[] = ['playButton', 'title', 'actions', 'artist', 'album', 'length'];

  @Output() selectedPlaylistChanged = new EventEmitter();

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService) {
    this.route.params.subscribe(params => {
      this.playlistIndex = +params['id'];
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
      this.selectedPlaylistChanged.emit(this.playlistIndex);
    });

    this.spotifyApiService.playlistsFetched.subscribe(() => {
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
    });
  }

  ngOnInit() {
  }

}
