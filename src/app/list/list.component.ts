import { Component, OnInit, Input } from '@angular/core';
import { ListType } from '../shared/listType';
import { Playlist } from '../shared/playlist.model';
import { Album } from '../shared/album.modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private ListType = ListType;
  @Input() type: ListType;
  @Input() playlist: Playlist;
  @Input() album: Album;

  constructor() { }

  ngOnInit() {
  }

}
