import { Component, OnInit } from '@angular/core';
import {AnimeService} from '../anime.service'
import { Anime } from '../anime';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../serv/auth.service';
import { DialogloginComponent } from '../dialoglogin/dialoglogin.component';
import { DialogcreateanimeComponent } from '../dialogcreateanime/dialogcreateanime.component';
import { MatDialog } from '@angular/material/dialog';
import { DialoganimeeditComponent } from '../dialoganimeedit/dialoganimeedit.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
  })
  export class AnimeComponent implements OnInit {
    private urlDelById = "http://localhost:8080/api/anime/delete/";

    isAdmin: boolean = this.authService.isAdmin();

    animes!: Anime[];

    constructor(private authService: AuthService, private animeService: AnimeService, public dialog: MatDialog, private http: HttpClient,) { }

    refreshAnimeList() {
      // Реализуйте логику обновления списка аниме
      this.animeService.getAnimes().subscribe((data: Anime[]) => {
        this.animes = data;
      });
    }
    
    private subscription!: Subscription;

    ngOnInit(): void {
      this.animeService.getAnimes().subscribe((data: Anime[]) => {
        this.animes = data;
      });

      this.isAdmin = this.authService.isAdmin();
  
      this.authService.authChangedAdmin.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });

      this.subscription = this.animeService.animeUpdated$.subscribe(() => {
        // Обновите список аниме
        this.refreshAnimeList();
      });

    }

    CreateAnime() {
      this.dialog.open(DialogcreateanimeComponent, {
        maxHeight: 'none',
      });
    }

    EditAnime(anime: Anime){
      const genreIdss = anime.genres.map(genre => genre.id);
      this.dialog.open(DialoganimeeditComponent, {
        maxHeight: 'none',
        data: { animeeу: anime }
      });
    }

    DeleteAnime(anime: Anime){
      console.log("delete");
      this.http.delete<boolean>(`${this.urlDelById}?id=${anime.id}`).subscribe(
        (response) => {
          // Обработка успешного удаления
          console.log('Deleted:', response);
          this.animeService.updateAnimeList();
        },
        (error) => {
          // Обработка ошибок удаления
          console.error('Error deleting:', error);
          this.animeService.updateAnimeList();
        }
      );
    }
  }
