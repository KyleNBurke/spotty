import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.modal';
import { ListType } from '../shared/listType';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SpotifyApiService } from '../shared/spotify-api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  private ListType = ListType;
  private album: Album;

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      this.spotifyApiService.fetchAlbum(params['id']).subscribe((album: Album) => {
        console.log(album);
        this.album = album;
      })
    });
  }

}
