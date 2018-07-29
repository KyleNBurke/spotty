import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { ActivatedRoute, Router } from '@angular/router';
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

  isTrackActive(index: number) {
    return this.playerService.context && this.playerService.context.uri === this.playlist.uri && this.playerService.trackIndex === index;
  }

  onTogglePlayButtonClicked(index: number) {
    if(this.isTrackActive(index)) {
      this.playerService.playing ? this.playerService.pauseCurrentSong() : this.playerService.playCurrentSong();
    }
    else {
      this.playerService.playNewSong(this.playlist, index);
    }
  }

  onArtistClick(trackIndex: number, artistIndex: number) {
    this.router.navigate(['/artist', this.playlist.tracks[trackIndex].artistID[artistIndex]]);
  }

  onAlbumClick(index: number) {
    this.router.navigate(['/album', this.playlist.tracks[index].albumID]);
  }

}
