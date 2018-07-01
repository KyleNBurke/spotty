import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'redirect', component: RedirectComponent },
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
    PlayerComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
