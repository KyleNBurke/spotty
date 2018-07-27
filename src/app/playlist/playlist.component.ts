import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private playlist: Playlist;
  private displayColumns: string[] = ['playButton', 'title', 'actions', 'artist', 'album', 'length'];

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlist = this.spotifyApiService.getPlaylist(+params['id']);
    });
  }

}
