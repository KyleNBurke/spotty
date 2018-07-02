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
          this.tracks = [];

          for(let i in data['items']) {
            const trackData = data['items'][i]['track'];
            const track = { 'title': trackData['name'], 'artist': trackData['artists'], 'album': trackData['album']};
            this.tracks.push(track);
          }

          console.log(this.tracks);
          this.table.renderRows();
        });
      });
    });
  }

}
