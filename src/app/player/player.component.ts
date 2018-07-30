import { Component, OnInit, EventEmitter } from '@angular/core';
import { Track } from '../shared/track.model';
import { PlayerService } from '../shared/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit() {
  }

  onToggleSong() {
    this.playerService.playing ? this.playerService.pauseCurrentSong() : this.playerService.playCurrentSong();
  }

  onAlbumClick() {
    this.router.navigate(['/album', this.playerService.track.albumID]);
  }

  onArtistClick(index: number) {
    this.router.navigate(['/artist', this.playerService.track.artistID[index]]);
  }
}
