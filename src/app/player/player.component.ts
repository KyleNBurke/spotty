import { Component, OnInit, EventEmitter } from '@angular/core';
import { Track } from '../shared/track.model';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  onToggleSong() {
    this.playerService.playing ? this.playerService.pauseCurrentSong() : this.playerService.playCurrentSong();
  }
}
