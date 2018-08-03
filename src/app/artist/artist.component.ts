import { Component, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../shared/artist.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { MatTable } from '@angular/material/table';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  private artist: Artist;
  private displayColumns: string[] = ['playButton', 'number', 'title', 'actions', 'explicit', 'album', 'length'];
  @ViewChild(MatTable) table: MatTable<null>; 
  private selectedAlbum: number = 0;

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService, private router: Router, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotifyApiService.fetchArtist(params['id']).subscribe((artist: Artist) => {
        this.artist = artist;
      })
    });

    this.spotifyApiService.artistPopularTracksFetched.subscribe(() => {
      for(let track of this.artist.tracks) {
        for(let i in track.artistName) {
          if(track.artistName[i] === this.artist.name) {
            track.artistName.splice(+i, 1);
            track.artistID.splice(+i, 1);
          }
        }
      }

      this.table.renderRows();
    });
  }

  private isTrackActive(index: number): boolean {
    return this.playerService.context && this.playerService.context.uri === this.artist.uri && this.playerService.trackIndex === index;
  }

  onTogglePlayButtonClicked(index: number) {
    if(this.isTrackActive(index)) {
      this.playerService.playing ? this.playerService.pauseCurrentSong() : this.playerService.playCurrentSong();
    }
    else {
      this.playerService.playNewSong(this.artist, index);
    }
  }

  onArtistClick(trackIndex: number, artistIndex: number, event) {
    event.stopPropagation();
    this.router.navigate(['/artist', this.artist.tracks[trackIndex].artistID[artistIndex]]);
  }

  onTableAlbumClick(index: number) {
    this.router.navigate(['/album', this.artist.tracks[index].albumID]);
  }

  onAlbumClick(index: number) {
    this.router.navigate(['/album', this.artist.albums[index][0].id]);
  }

  onSingleClick(index: number) {
    this.router.navigate(['/album', this.artist.singles[index].id]);
  }

  onAlbumMoreClick(index: number, event) {
    event.stopPropagation();
    this.selectedAlbum = index;
  }

  onOtherAlbumClick(index: number) {
    this.router.navigate(['/album', this.artist.albums[this.selectedAlbum][index].id]);
  }
}
