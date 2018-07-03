import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../shared/spotify.service';
import { Playlist } from '../shared/playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  displayColumns: string[] = ['title', 'artist', 'album'];
  playlist: Playlist;
  index: number;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = +params['id'];
      this.playlist = this.spotifyService.getPlaylist(this.index);
    });

    this.spotifyService.playlistsFetched.subscribe(() => {
      this.playlist = this.spotifyService.getPlaylist(this.index);
    });
  }

  onPlaySong(index: number) {
    this.spotifyService.playSong(this.playlist.tracks[index]);
  }

}
