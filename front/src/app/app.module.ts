import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeComponent } from './anime/anime.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './AuthInterceptor';
import { DialogloginComponent } from './dialoglogin/dialoglogin.component';
import { DialogSignUpComponent } from './dialogsignup/dialogsignup.component';
import { DialogcreateanimeComponent } from './dialogcreateanime/dialogcreateanime.component';
import {MatDialogContent} from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { DialoganimeeditComponent } from './dialoganimeedit/dialoganimeedit.component';
import { GenresComponent } from './genres/genres.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    DialogloginComponent,
    DialogSignUpComponent,
    DialogcreateanimeComponent,
    AnimeDetailComponent,
    DialoganimeeditComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,

    MatChipsModule,

    RouterModule.forRoot([
      {path: 'anime', component: AnimeComponent},
      {path: 'genres', component: GenresComponent},
    ]),
    MatDialogContent,

  ],

  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
