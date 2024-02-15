import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TypeDTO } from '../models/typeDTO';
import { TypeService } from '../type.service';
import { GenreService } from '../genre.service';
import { GenreDTO } from '../models/genreDTO';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-dialoganimeedit',
  templateUrl: './dialoganimeedit.component.html',
  styleUrl: './dialoganimeedit.component.css',
  host: {
    class: 'custom-dialog',
  },
})
export class DialoganimeeditComponent {
  genres!: GenreDTO[];
  name = '';
  origname = '';
  player = '';
  desc = '';
  rating = 0;
  duration = 1;
  typeDTOlist!: TypeDTO[];
  type!: TypeDTO;
  genreDTOlist!: GenreDTO[];
  poster: File | null = null;

      // Обработчик выбора файла
      onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.poster = file;
      }
  

  uri = 'http://localhost:8080/api/type/';

  urledit = 'http://localhost:8080/api/anime/edit/';

  validateRating(value: any) {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 10) {
        // Если введено некорректное значение, сбросить rating на 0 или другое значение по вашему выбору
        this.rating = 0;
    } else {
        // Иначе обновить значение rating
        this.rating = parsedValue;
    }
}


anime!: Anime;

  constructor(
    private typeService: TypeService,
    private genreService: GenreService,
    public dialog: MatDialog,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialoganimeeditComponent>,
    private animeService: AnimeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.anime = data.animeeу;
    }


    compareItems(i1:GenreDTO, i2:GenreDTO) {
      return i1 && i2 && i1.id===i2.id;
    }

  ngOnInit() {

    this.typeService.getTypes().subscribe((data: TypeDTO[]) => {
      this.typeDTOlist = data;
    });
    

    this.genreService.getGenres().subscribe((data: GenreDTO[]) => {
      this.genreDTOlist = data;
    });


    this.name = this.anime.name;
      this.desc = this.anime.desc;
      this.origname = this.anime.originalName;
      this.duration = this.anime.duration;
      this.rating = this.anime.rating;
      this.player = this.anime.player;
      this.type = this.anime.type;
      if (this.anime.genres != null){
        this.genres = this.anime.genres
      }

  }

  Edit() {

    const formData = new FormData();

    if (this.poster) {
      formData.append('file', this.poster, this.poster.name);
    }

    formData.append('id', this.anime.id);

    formData.append('name', this.name);
    formData.append('origName', this.origname);
    formData.append('desc', this.desc);
    formData.append('rating', this.rating.toString());
    formData.append('duration', this.duration.toString());
    formData.append('player', this.player)

    formData.append('type', this.type.id.toString());

    const genresID = this.genres.map(genre => genre.id.toString());

    genresID.forEach(id => {
      formData.append('genres', id);
    });
    
    this.http.post<ResponseType>(this.urledit, formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.dialogRef.close();
        this.animeService.updateAnimeList();
      },
      (error) => {
        console.error('Error:', error);
        this.dialogRef.close();
        this.animeService.updateAnimeList();
      }
    )
  }
    
}
