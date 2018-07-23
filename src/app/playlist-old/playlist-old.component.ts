import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { Playlist } from '../shared/playlist.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-playlist-old',
  templateUrl: './playlist-old.component.html',
  styleUrls: ['./playlist-old.component.scss']
})
export class PlaylistOldComponent implements OnInit {
  displayColumns: string[] = ['playButton', 'title', 'actions', 'artist', 'album', 'length'];
  playlist: Playlist;
  playlistIndex: number;
  @Output() selectedPlaylistChanged = new EventEmitter();
  trackIndex: number;

  constructor(private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService,
    private dialog: MatDialog,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlistIndex = +params['id'];
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
      this.selectedPlaylistChanged.emit(this.playlistIndex);
    });

    this.spotifyApiService.playlistsFetched.subscribe(() => {
      this.playlist = this.spotifyApiService.getPlaylist(this.playlistIndex);
    });
  }

  onPlayClicked() {
    this.playerService.playNewSong(this.playlist, 0);
  }

  onTrackClicked(index: number) {
    if(index !== this.playerService.trackIndex) {
      this.playerService.playNewSong(this.playlist, index);
    }
  }

  onTogglePlayButtonClicked(index: number) {
    if(index === this.playerService.trackIndex) {
      this.playerService.playing ? this.playerService.pauseCurrentSong() : this.playerService.playCurrentSong();
    }
    else {
      this.playerService.playNewSong(this.playlist, this.trackIndex);
    }
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: this.playlist.name,
      public: this.playlist.public
    }

    this.dialog.open(EditComponent, dialogConfig);
  }

}