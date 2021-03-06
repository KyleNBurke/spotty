import { Injectable } from '@angular/core';
import { SpotifyApiService, Context } from './spotify-api.service';
import { Track } from './track.model';
import { Playlist } from './playlist.model';
import { Album } from './album.model';
import { Artist } from './artist.model';

enum RepeatType {
  none = 0,
  repeatPlaylist,
  repeatTrack
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  context: Playlist | Album | Artist;
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

  private get currentTrackImage() : string {
    return this.track.image ? this.track.image : this.context.image;
  }

  playNewSong(list: Playlist | Album | Artist, index: number) {
    this.context = list;
    this.trackIndex = index;
    this.playing = true;

    if(list.context === Context.Artist) {
      let uris = [];
      for(let track of list.tracks) {
        uris.push(track.uri);
      }

      this.spotifyApiService.playNewSongWithUris(uris, index);
    }
    else {
      this.spotifyApiService.playNewSong(list.uri, this.trackIndex);
    }
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
