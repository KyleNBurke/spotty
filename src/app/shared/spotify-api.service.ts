import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Playlist } from './playlist.model';
import { Album } from './album.model';
import { map } from 'rxjs/operators';
import { Track } from './track.model';
import { Artist, ArtistAlbum } from './artist.model';

export enum Context {
  Playlist,
  Album,
  Artist
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private headers: HttpHeaders = new HttpHeaders();

  private _userId: string;
  private _userDisplayName: string;
  userDataFetched = new Subject<string>();

  private _playlists: Playlist[] = [];
  playlistsFetched = new Subject<Playlist[]>();

  artistPopularTracksFetched = new Subject();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + authService.accessToken);

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
        const uri = playlist['uri'];
        const image = Object.keys(playlist['images']).length === 0 ? null : playlist['images'][0]['url'];
        const publicPlaylist = playlist['public'];
        const owner = playlist['owner']['id'];
        let tracks = [];
        this.fetchTracks(id).subscribe((data: Object) => {
          for(let j in data['items']) {
            const trackData = data['items'][j]['track'];
            tracks.push(this.parseTrack(trackData, Context.Playlist));
          }

          const playlistToAdd: Playlist = {
            context: Context.Playlist,
            name: name,
            tracks: tracks,
            id: id,
            uri: uri,
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

  fetchAlbum(id: string): Observable<Album> {
    const endpoint = 'https://api.spotify.com/v1/albums/' + id;

    return this.httpClient.get<Album>(endpoint, { headers: this.headers }).pipe(
      map((data) => {
        let artistsName: string[] = [];
        let artistsID: string[] = [];
        for(let k in data['artists']) {
          const name = data['artists'][k]['name'];
          artistsName.push(name);
          const id = data['artists'][k]['id'];
          artistsID.push(id);
        }

        let tracks = [];
        for(let j in data['tracks']['items']) {
          const trackData = data['tracks']['items'][j];
          tracks.push(this.parseTrack(trackData, Context.Album));
        }

        for(let albumArtistID of artistsID) {
          for(let i in tracks) {
            for(let j in tracks[i].artistID) {
              if(albumArtistID === tracks[i].artistID[j]) {
                tracks[i].artistName.splice(+j, 1);
                tracks[i].artistID.splice(+j, 1);
              }
            }
          }
        }

        let type = data['album_type'];
        if(type === 'single' && tracks.length > 0) {
          type = 'EP';
        }

        let album: Album =  {
          context: Context.Album,
          name: data['name'],
          tracks: tracks,
          uri: data['uri'],
          image: Object.keys(data['images']).length === 0 ? null : data['images'][0]['url'],
          artistName: artistsName,
          artistID: artistsID,
          type: type
        }

        return album;
      }));
  }

  fetchArtist(id: string): Observable<Artist> {
    const endpoint = 'https://api.spotify.com/v1/artists/' + id;

    return this.httpClient.get<Artist>(endpoint, { headers: this.headers }).pipe(
      map((data) => {
        const endpoint2 = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks';
        const params2 = { 'country': 'US' };
        let tracks = [];
        this.httpClient.get(endpoint2, { headers: this.headers, params: params2 }).subscribe((data: Object) => {
          for(let i in data['tracks']) {
            tracks.push(this.parseTrack(data['tracks'][i], Context.Artist));
          }

          this.artistPopularTracksFetched.next();
        });

        const endpoint3 = 'https://api.spotify.com/v1/artists/' + id + '/albums';
        const params3 = { 'include_groups': 'album', 'limit': '50'};
        let albums: [ArtistAlbum[]] = [[]];
        this.httpClient.get(endpoint3, { headers: this.headers, params: params3 }).subscribe((data: Object) => {
          let newName = '';
          for(let i = 0; i < Object.keys(data['items']).length; i++) {
            const album = data['items'][i];
            const name = album['name'];
            const albumToAdd: ArtistAlbum = {
              name: name,
              image: Object.keys(album['images']).length === 0 ? null : album['images'][0]['url'],
              id: album['id'],
              date: album['release_date']
            }

            if(name === newName) {
              albums[albums.length - 1].push(albumToAdd);
            }
            else {
              newName = name;
              i === 0 ? albums[0] = [albumToAdd] : albums.push([albumToAdd]);
            }
          }
        });

        const endpoint4 = 'https://api.spotify.com/v1/artists/' + id + '/albums';
        const params4 = { 'include_groups': 'single', 'limit': '50'};
        let singles: ArtistAlbum[] = [];
        this.httpClient.get(endpoint4, { headers: this.headers, params: params4 }).subscribe((data: Object) => {
          for(let single of data['items']) {
            const singleToAdd: ArtistAlbum = {
              name: single['name'],
              image: Object.keys(single['images']).length === 0 ? null : single['images'][0]['url'],
              id: single['id'],
              date: single['release_date']
            }

            singles.push(singleToAdd);
          }
        });

        let artist: Artist =  {
          context: Context.Artist,
          name: data['name'],
          image: Object.keys(data['images']).length === 0 ? null : data['images'][0]['url'],
          tracks: tracks,
          uri: data['uri'],
          albums: albums,
          singles: singles
        }

        return artist;
      }));
  }

  private parseTrack(data: Object, context: Context): Track {
    let artistsName: string[] = [];
    let artistsID: string[] = [];

    for(let k in data['artists']) {
      const name = data['artists'][k]['name'];
      artistsName.push(name);

      const id = data['artists'][k]['id'];
      artistsID.push(id);
    }

    let s = data['duration_ms'];
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;

    const track = {
      'title': data['name'],
      'artistName': artistsName,
      'artistID': artistsID,
      'albumName': context === Context.Album ? null : data['album']['name'],
      'albumID': context === Context.Album ? null : data['album']['id'],
      'uri': data['uri'],
      'image': context === Context.Album ? null : (Object.keys(data['album']['images']).length !== 0 ? data['album']['images'][2]['url'] : null),
      'length': +data['duration_ms'],
      'lengthFormatted': mins + ":" + (secs.toString().length < 2 ? '0' + secs : secs),
      'explicit': data['explicit']
    };

    return track;
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

  playNewSong(contextUri: string, offset: number) {
    const endpoint = 'https://api.spotify.com/v1/me/player/play';
    const bodyParams = {
      context_uri: contextUri,
      offset: { 'position': offset }
    }

    this.httpClient.put(endpoint, bodyParams, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }

  playNewSongWithUris(uris: string[], offset: number) {
    const endpoint = 'https://api.spotify.com/v1/me/player/play';
    const bodyParams = {
      uris: uris,
      offset: { 'position': offset }
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

  playPrevSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/previous';

    this.httpClient.post(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }

  playNextSong() {
    const endpoint = 'https://api.spotify.com/v1/me/player/next';

    this.httpClient.post(endpoint, null, { headers: this.headers }).subscribe((data: Object) => {
      //console.log(data);
    });
  }
}
