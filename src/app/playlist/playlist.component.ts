import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private playlist: Playlist;
  private playlistIndex: number;
  private displayColumns: string[] = ['playButton', 'title', 'actions', 'artist', 'album', 'length'];

  constructor(private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlistIndex = +params['id'];
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
    });

    this.spotifyApiService.playlistsFetched.subscribe(() => {
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
    });
  }

  onAlbumClick(index: number) {
    //const uri = "/album/" + this.playlist.tracks[index].albumID;

    this.router.navigate(['/album', this.playlist.tracks[index].albumID]);
  }

}
