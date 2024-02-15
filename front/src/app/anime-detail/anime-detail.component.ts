import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anime } from '../anime';
import {AnimeService} from '../anime.service'
import {MatCardModule} from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.css'
})
export class AnimeDetailComponent {

  anime!: Anime;
  animeId: string= '';

  constructor(private route: ActivatedRoute, private animeService: AnimeService, private sanitizer: DomSanitizer) { }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animeId = params['id'];
      // Здесь вы можете использовать animeId для загрузки данных об аниме
    });

    this.animeService.getById(this.animeId).subscribe((data: Anime) => {
      this.anime = data;
    });
    
  }

}
