import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';
import { TrackComponent } from './track/track.component';
import { PlaylistComponent } from './playlist/playlist.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RedirectComponent } from './redirect/redirect.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import  {MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'playlists', pathMatch: 'full' },
  { path: 'redirect', component: RedirectComponent },
  { path: 'playlists', redirectTo: 'playlists/0', pathMatch: 'full' },
  { path: 'playlists/:id', component: PlaylistsComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    BrowseComponent,
    SearchComponent,
    PlayerComponent,
    RedirectComponent,
    NavbarComponent,
    TrackComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
