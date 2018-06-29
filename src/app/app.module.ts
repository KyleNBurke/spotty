import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';

const routes = [
  { path: '', component: SignInComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    PlaylistsComponent,
    BrowseComponent,
    SearchComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
