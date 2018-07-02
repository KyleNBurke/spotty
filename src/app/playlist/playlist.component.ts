import { Component, OnInit, ViewChild } from '@angular/core';
import { Track } from '../track/track.model';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../shared/spotify.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  displayColumns: string[] = ['title', 'artist', 'album'];
  tracks: Track[] = [];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.playListsFetched.subscribe(() => {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.spotifyService.getPlaylistTracks(id).subscribe((data: Object) => {
          this.showPlaylist(data);
        });
      });
    });
  }

  showPlaylist(data: Object) {
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
