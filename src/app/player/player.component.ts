import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.model';
import { SpotifyService } from '../shared/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  private track: Track;
  playing: boolean = false;

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.currentTrackChanged.subscribe((track: Track) => {
      this.track = track;
      this.playing = true;
    })
  }

  ngOnInit() {
  }

  onTogglePlay() {
    if(this.playing)
      this.spotifyService.pauseCurrentSong();
    else
      this.spotifyService.playCurrentSong();

    this.playing = !this.playing;
  }

}
