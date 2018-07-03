import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Track } from '../track/track.model';
import { Playlist } from './playlist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string;
  private headers: HttpHeaders = new HttpHeaders();

  private userId: string;
  userIdFetched = new Subject<string>();

  private currentTrack: Track;
  currentTrackChanged = new Subject<Track>();

  private _playlists: Playlist[] = [];
  playlistsFetched = new Subject<Playlist[]>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.accessToken = authService.accessToken;
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.accessToken);

    this.fetchUserId();
    this.userIdFetched.subscribe(() => {
      this.fetchPlaylists();
    })
  }

  fetchPlaylists() {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      let count = 0;
      const playlistCount = Object.keys(data['items']).length;

      for(let i in data['items']) {
        const playlist = data['items'][i];
        const name = playlist['name'];
        const id = playlist['id'];
        let tracks = [];
        this.fetchTracks(id).subscribe((data: Object) => {
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
              'artwork': Object.keys(trackData['album']['images']).length !== 0 ? trackData['album']['images'][2]['url'] : null
            };
            
            tracks.push(track);
          }

          const playlistToAdd: Playlist = {
            name: name,
            tracks: tracks,
            id: id
          }

          this._playlists.push(playlistToAdd);
          
          if(++count === playlistCount) {
            this.playlistsFetched.next(this._playlists);
          }
        });
      }
    });
  }

  fetchTracks(id: string) {
    const endpoint = 'https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + id + '/tracks';

    return this.httpClient.get(endpoint, { headers: this.headers });
  }

  getPlaylist(index: number) {
    return this._playlists[index];
  }

  get playlists(): Playlist[] {
    return this._playlists;
  }

  private fetchUserId() {
    const endpoint = 'https://api.spotify.com/v1/me';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      this.userId = data['id'];
      this.userIdFetched.next(this.userId);
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
