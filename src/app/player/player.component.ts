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

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.currentlyPlayingTrackChanged.subscribe((track: Track) => {
      this.track = track;
    })
  }

  ngOnInit() {
  }

}
