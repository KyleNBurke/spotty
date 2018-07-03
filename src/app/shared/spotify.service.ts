import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Track } from '../track/track.model';
import { Playlist } from './playlist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string;
  private headers: HttpHeaders = new HttpHeaders();
  private userId: string;

  private currentTrack: Track;
  currentTrackChanged = new Subject<Track>();

  private _playlists: Playlist[] = [];
  playlists2Fetched = new Subject<Playlist[]>();
  playlist2TracksFetched = new Subject<Playlist>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.accessToken = authService.accessToken;
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.accessToken);

    this.getUserId();

    this.getPlaylists();
  }

  getPlaylists() {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      for(let i in data['items']) {
        const playlist: Playlist = {
          name: data['items'][i]['name'],
          tracksLoaded: false,
          tracks: [],
          id: data['items'][i]['id']
        };
        this._playlists.push(playlist);
      }

      this.playlists2Fetched.next(this._playlists);
    });
  }

  getPlaylist(index: number) {
    return this._playlists[index];
  }

  fetchPlaylistTracks(index: number) {
    const playlistId = this._playlists[index].id;
    const endpoint = 'https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + playlistId + '/tracks';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      this._playlists[index].tracks = [];

      for(let i in data['items']) {
        const trackData = data['items'][i]['track'];
        let artists: string[] = [];
  
        for(let j in trackData['artists']) {
          const name = trackData['artists'][j]['name'];
          artists.push(j === '0' ? name : ' ' + name);
        }
  
        const track = {
          'title': trackData['name'],
          'artist': artists,
          'album': trackData['album']['name'],
          'uri': trackData['uri'],
          'artwork': trackData['album']['images'][2]['url']
        };
        this._playlists[index].tracks.push(track);
      }

      this._playlists[index].tracksLoaded = true;
      this.playlist2TracksFetched.next(this._playlists[index]);
    });
  }

  get playlists(): Playlist[] {
    return this._playlists;
  }

  private getUserId() {
    const endpoint = 'https://api.spotify.com/v1/me';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      this.userId = data['id'];
    });
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
