import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Track } from './track.model';
import { Playlist } from './playlist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string;
  private headers: HttpHeaders = new HttpHeaders();

  private _userId: string;
  private _userDisplayName: string;
  userDataFetched = new Subject<string>();


  private currentTrack: Track;
  currentTrackChanged = new Subject<Track>();

  private _playlists: Playlist[] = [];
  playlistsFetched = new Subject<Playlist[]>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.accessToken = authService.accessToken;
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.accessToken);

    this.fetchUserData();
    this.userDataFetched.subscribe(() => {
      this.fetchPlaylists();
    })
  }

  fetchPlaylists() {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      let count = 0;
      const playlistCount = Object.keys(data['items']).length;
      this._playlists.length = playlistCount;

      for(let i in data['items']) {
        const playlist = data['items'][i];
        const name = playlist['name'];
        const id = playlist['id'];
        const image = Object.keys(playlist['images']).length === 0 ? null : playlist['images'][0]['url'];
        const publicPlaylist = playlist['public'];
        const owner = playlist['owner']['id'];
        let tracks = [];
        this.fetchTracks(id).subscribe((data: Object) => {
          for(let j in data['items']) {
            const trackData = data['items'][j]['track'];
            let artists: string[] = [];
      
            for(let k in trackData['artists']) {
              const name = trackData['artists'][k]['name'];
              artists.push(name);
            }

            let s = trackData['duration_ms'];
            let ms = s % 1000;
            s = (s - ms) / 1000;
            let secs = s % 60;
            s = (s - secs) / 60;
            let mins = s % 60;
      
            const track = {
              'title': trackData['name'],
              'artist': artists,
              'album': trackData['album']['name'],
              'uri': trackData['uri'],
              'artwork': Object.keys(trackData['album']['images']).length !== 0 ? trackData['album']['images'][2]['url'] : null,
              'length': +trackData['duration_ms'],
              'lengthFormatted': mins + ":" + (secs.toString().length < 2 ? '0' + secs : secs)
            };
            
            tracks.push(track);
          }

          const playlistToAdd: Playlist = {
            name: name,
            tracks: tracks,
            id: id,
            image: image,
            public: publicPlaylist,
            owner: owner
          }

          this._playlists.splice(+i, 1, playlistToAdd);
          
          if(++count === playlistCount) {
            this.playlistsFetched.next(this._playlists);
          }
        });
      }
    });
  }

  fetchTracks(id: string) {
    const endpoint = 'https://api.spotify.com/v1/users/' + this._userId + '/playlists/' + id + '/tracks';

    return this.httpClient.get(endpoint, { headers: this.headers });
  }

  getPlaylist(index: number) {
    return this._playlists[index];
  }

  get playlists(): Playlist[] {
    return this._playlists;
  }

  get userId(): string {
    return this._userId;
  }

  get userDisplayName(): string {
    return this._userDisplayName;
  }

  private fetchUserData() {
    const endpoint = 'https://api.spotify.com/v1/me';

    this.httpClient.get(endpoint, { headers: this.headers }).subscribe((data: Object) => {
      this._userId = data['id'];
      this._userDisplayName = data['display_name'] ? data['display_name'] : this._userId;
      this.userDataFetched.next(this._userId);
    });
  }

  playSong(track: Track) {
    this.currentTrack = track;
    this.currentTrackChanged.next(this.currentTrack);

    const endpoint = 'https://api.spotify.com/v1/me/player/play';
    const bodyParams = {
      uris: [this.currentTrack.uri]
    }

    //this.httpClient.put(endpoint, bodyParams, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    //});
  }

  playCurrentSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/play';

    //this.httpClient.put(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    //});
  }

  pauseCurrentSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/pause';

    //this.httpClient.put(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    //});
  }
}
