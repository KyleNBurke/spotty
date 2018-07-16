import { Component, OnInit } from '@angular/core';
import { Track } from '../shared/track.model';
import { SpotifyService } from '../shared/spotify.service';

enum RepeatType {
  none = 0,
  repeatPlaylist,
  repeatTrack
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  private track: Track;
  private playing: boolean = false;
  private intervalRef;
  private interval: number = 500;
  private sliderValue: number = 0;
  private sliderMaxValue = 100;
  private shuffle: boolean = false;
  private repeatType = RepeatType;
  private repeat: RepeatType = this.repeatType.none;
  private volume: boolean = true;
  

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.currentTrackChanged.subscribe((track: Track) => {
      this.track = track;
      this.playing = true;
      this.interval = this.track.length / this.sliderMaxValue;
      this.sliderValue = 0;
      clearInterval(this.intervalRef);
      this.intervalRef = setInterval(this.incrementSlider.bind(this), this.interval);
    });
  }

  onTogglePlay() {
    if(this.playing) {
      this.spotifyService.pauseCurrentSong();
      clearInterval(this.intervalRef);
    }
    else {
      this.spotifyService.playCurrentSong();
      this.intervalRef = setInterval(this.incrementSlider.bind(this), this.interval);
    }

    this.playing = !this.playing;
  }

  onToggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  onChangeRepeat() {
    this.repeat = ++this.repeat % 3;
  }

  onToggleVolume() {
    this.volume = !this.volume;
  }

  incrementSlider() {
    this.sliderValue++;
    
    if(this.sliderValue == this.sliderMaxValue) {
      this.onTogglePlay();
    }
  }

  onShowMenu() {
    console.log("show menu");
  }

}
