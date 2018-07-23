import { Injectable, EventEmitter } from '@angular/core';
import { SpotifyApiService } from './spotify-api.service';
import { Track } from './track.model';
import { Playlist } from './playlist.model';

enum RepeatType {
  none = 0,
  repeatPlaylist,
  repeatTrack
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  context: Playlist;
  trackIndex: number;
  playing: boolean = false;
  volume: boolean = true;
  shuffle: boolean = false;

  private repeatType = RepeatType;
  private repeat: RepeatType = this.repeatType.none;

  constructor(private spotifyApiService: SpotifyApiService) { }

  get track(): Track {
    return this.context ? this.context.tracks[this.trackIndex] : null;
  }

  playNewSong(context: Playlist, index: number) {
    this.context = context;
    this.trackIndex = index;
    this.playing = true;
    this.spotifyApiService.playNewSong(context.uri, this.trackIndex);
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
    this.trackIndex--;
    this.playing = true;
    this.spotifyApiService.playPrevSong();
  }

  playNextSong() {
    this.trackIndex++;
    this.playing = true;
    this.spotifyApiService.playNextSong();
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
