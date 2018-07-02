import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../playlists/playlist.model';
import { Track } from '../track/track.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string;
  private headers: HttpHeaders = new HttpHeaders();
  private userId: string;
  private currentlyPlayingTrack: Track;
  currentlyPlayingTrackChanged = new Subject<Track>();

  private playlists: Playlist[] = [];
  playListsFetched = new Subject<Playlist[]>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.accessToken = authService.accessToken;
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.accessToken);

    this.getUserId();
    this.getPlaylists();
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
    this.currentlyPlayingTrack = track;
    this.currentlyPlayingTrackChanged.next(this.currentlyPlayingTrack);

    /*let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    console.log(headers);

    const endpoint1 = 'https://api.spotify.com/v1/me/player/currently-playing';
    this.httpClient.get(endpoint1, { headers: headers }).subscribe((data: Object) => {
      console.log(data);
    });

    const endpoint2 = 'https://api.spotify.com/v1/me/player/play';
    this.httpClient.put(endpoint2, { headers: headers }).subscribe((data: Object) => {
      console.log(data);
    });*/
  }
}
