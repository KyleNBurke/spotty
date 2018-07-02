import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../playlists/playlist.model';
import { Track } from '../track/track.model';
import { Playlist2 } from './playlist2.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string;
  private headers: HttpHeaders = new HttpHeaders();
  private userId: string;

  private currentTrack: Track;
  currentTrackChanged = new Subject<Track>();

  private playlists: Playlist[] = [];
  playListsFetched = new Subject<Playlist[]>();

  private _playlists2: Playlist2[] = [];
  playlists2Fetched = new Subject<Playlist2[]>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.accessToken = authService.accessToken;
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.accessToken);

    this.getUserId();
    this.getPlaylists();

    this.getPlaylists2();
  }

  getPlaylists() {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';
    
    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      for(let item in data['items']) {
        const playlist = data['items'][item];
        const playlistToAdd: Playlist = {name: playlist['name'], id: playlist['id']};
        this.playlists.push(playlistToAdd);
      }

      this.playListsFetched.next(this.playlists);
    });
  }

  getPlaylists2() {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);

      for(let i in data['items']) {
        const playlist: Playlist2 = {
          name: data['items'][i]['name'],
          tracksLoaded: false,
          tracks: []
        };
        this._playlists2.push(playlist);
      }

      this.playlists2Fetched.next(this._playlists2);
    });
  }

  getPlaylist(index: number) {
    return this._playlists2[index];
  }

  get playlists2(): Playlist2[] {
    return this._playlists2;
  }

  private getUserId() {
    const endpoint = 'https://api.spotify.com/v1/me';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      this.userId = data['id'];
    });
  }

  getPlaylistTracks(index: number): Observable<Object> {
    const playlistId = this.playlists[index].id;
    const endpoint = 'https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + playlistId + '/tracks';

    return this.httpClient.get(endpoint, { headers: this.headers });
  }

  playSong(track: Track) {
    this.currentTrack = track;
    this.currentTrackChanged.next(this.currentTrack);

    const endpoint = 'https://api.spotify.com/v1/me/player/play';
    const bodyParams = {
      uris: [this.currentTrack.uri]
    }

    this.httpClient.put(endpoint, bodyParams, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }

  playCurrentSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/play';

    this.httpClient.put(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }

  pauseCurrentSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/pause';

    this.httpClient.put(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }
}
