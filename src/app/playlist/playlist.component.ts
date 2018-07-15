import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist } from '../shared/playlist.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  displayColumns: string[] = ['title', 'artist', 'album'];
  playlist: Playlist;
  playlistIndex: number;
  @Output() selectedPlaylistChanged = new EventEmitter();
  trackIndex: number;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlistIndex = +params['id'];
      this.playlist = this.spotifyService.getPlaylist(this.playlistIndex);
      this.selectedPlaylistChanged.emit(this.playlistIndex);
    });

    this.spotifyService.playlistsFetched.subscribe(() => {
      this.playlist = this.spotifyService.getPlaylist(this.playlistIndex);
    });
  }

  onPlaySong(index: number) {
    this.trackIndex = index;
    this.spotifyService.playSong(this.playlist.tracks[this.trackIndex]);
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
