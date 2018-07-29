import { Component, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../shared/artist.model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { MatTable } from '../../../node_modules/@angular/material/table';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  private artist: Artist;
  private displayColumns: string[] = ['playButton', 'number', 'title', 'actions', 'album', 'length'];
  @ViewChild(MatTable) table: MatTable<null>; 

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotifyApiService.fetchArtist(params['id']).subscribe((artist: Artist) => {
        this.artist = artist;
        console.log(this.artist);
      })
    });

    this.spotifyApiService.artistPopularTrackFetched.subscribe(() => {
      console.log('refresh table');
      this.table.renderRows();
    });
  }

  private isTrackActive(): boolean {
    return false;
  }

}
