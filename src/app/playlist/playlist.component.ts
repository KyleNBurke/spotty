import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  displayColumns: string[] = ['title', 'artist', 'album'];

  tracks: Track[] = [
    { title: 'track 1', artist: 'artist', album: 'album' },
    { title: 'track 2', artist: 'artist', album: 'album' },
    { title: 'track 3', artist: 'artist', album: 'album' },
    { title: 'track 4', artist: 'artist', album: 'album' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
