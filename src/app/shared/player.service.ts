import { Injectable, EventEmitter } from '@angular/core';
import { SpotifyApiService } from './spotify-api.service';
import { Track } from './track.model';

enum RepeatType {
  none = 0,
  repeatPlaylist,
  repeatTrack
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentTrack: Track;
  playing: boolean = false;
  volume: boolean = true;
  shuffle: boolean = false;

  private repeatType = RepeatType;
  private repeat: RepeatType = this.repeatType.none;

  constructor(private spotifyApiService: SpotifyApiService) { }

  playNewSong(track: Track, contextUri: string, offset: number) {
    this.currentTrack = track;
    this.playing = true;
    this.spotifyApiService.playNewSong(contextUri, offset);
  }

  pauseCurrentSong() {
    this.playing = false;
    this.spotifyApiService.pauseCurrentSong();
  }

  playCurrentSong() {
    this.playing = true;
    this.spotifyApiService.playCurrentSong();
  }

  playPrevSong() {
    console.log('prev');
  }

  playNextSong() {
    console.log('next');
  }

  changeRepeat() {
    this.repeat = ++this.repeat % 3;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  toggleVolume() {
    this.volume = !this.volume;
  }

}
