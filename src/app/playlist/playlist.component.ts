import { Component, OnInit, ViewChild } from '@angular/core';
import { Track } from '../track/track.model';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../shared/spotify.service';
import { MatTable } from '@angular/material/table';
import { Playlist2 } from '../shared/playlist2.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  name: string;
  displayColumns: string[] = ['title', 'artist', 'album'];
  tracks: Track[] = [];
  @ViewChild(MatTable) table: MatTable<any>;

  playlist: Playlist2;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    /*this.spotifyService.playListsFetched.subscribe(() => {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.spotifyService.getPlaylistTracks(id).subscribe((data: Object) => {
          this.showPlaylist(data);
        });
      });
    });*/

    //this.spotifyService.getPlaylists2();

    //this.playlist = { name: '', tracks: [], tracksLoaded: false };
    console.log(this.playlist);

    this.route.params.subscribe(params => {
      const index = +params['id'];
      this.playlist = this.spotifyService.getPlaylist(index);
      console.log(this.playlist);
      
      this.spotifyService.playlists2Fetched.subscribe(() => {
        this.playlist = this.spotifyService.getPlaylist(index);
        console.log(this.playlist);
        //console.log(this.table);
      });
    });

    console.log(this.playlist);
  }

  showPlaylist(data: Object) {
    console.log(data);
    this.tracks = [];

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
      this.tracks.push(track);
    }

    this.table.renderRows();
  }

  onPlaySong(index: number) {
    this.spotifyService.playSong(this.tracks[index]);
  }

}
