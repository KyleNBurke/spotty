import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../shared/spotify.service';
import { MatTable } from '@angular/material/table';
import { Playlist } from '../shared/playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  displayColumns: string[] = ['title', 'artist', 'album'];
  @ViewChild(MatTable) table: MatTable<any>;
  playlist: Playlist;
  index: number;
  setup: boolean = false;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //initial playlist fetch
      this.spotifyService.playlists2Fetched.subscribe(() => {
        this.playlist = this.spotifyService.getPlaylist(this.index);
        this.changeDetector.detectChanges();
        this.setup = true;
        this.showPlaylist();
      });

      this.index = +params['id'];
      this.playlist = this.spotifyService.getPlaylist(this.index);
      if(this.setup) {
        this.showPlaylist();
      }
    });
  }

  showPlaylist() {
    if(!this.playlist.tracksLoaded) {
      this.spotifyService.playlist2TracksFetched.subscribe((playlist: Playlist) => {
        this.playlist = playlist;
        this.table.renderRows();
      });

      this.spotifyService.fetchPlaylistTracks(this.index);
    }
    else {
      this.table.renderRows();
    }
  }

  onPlaySong(index: number) {
    this.spotifyService.playSong(this.playlist.tracks[index]);
  }

}
