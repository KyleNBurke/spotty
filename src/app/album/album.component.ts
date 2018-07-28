import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.modal';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  private album: Album;
  private displayColumns: string[] = ['playButton', 'title', 'actions', 'length'];

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService, private playerService: PlayerService) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      this.spotifyApiService.fetchAlbum(params['id']).subscribe((album: Album) => {
        this.album = album;
      })
    });
  }

  onTogglePlayButtonClicked(index: number) {
    this.playerService.playNewSong(this.album, index);
  }

}
