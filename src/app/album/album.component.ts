import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.modal';
import { ListType } from '../shared/listType';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  private ListType = ListType;
  private album: Album = { name: "test album" };

  constructor() { }

  ngOnInit() {
  }

}
