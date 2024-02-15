import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TypeDTO } from '../models/typeDTO';
import { TypeService } from '../type.service';
import { GenreService } from '../genre.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GenreDTO } from '../models/genreDTO';
import { AnimeService } from '../anime.service';



@Component({
  selector: 'app-dialogcreateanime',
  templateUrl: './dialogcreateanime.component.html',
  styleUrl: './dialogcreateanime.component.css',
  host: {
    class: 'custom-dialog',
  },
})
export class DialogcreateanimeComponent {
  genres: FormControl = new FormControl([]);
  name = '';
  origname = '';
  player = '';
  desc = '';
  rating = 0;
  duration = 1;
  typeDTOlist!: TypeDTO[];
  genreDTOlist!: GenreDTO[];
  poster: File | null = null;

      // Обработчик выбора файла
      onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.poster = file;
      }
  
  // Создайте FormGroup
  myFormGroup!: FormGroup; // Изменено здесь

  uri = 'http://localhost:8080/api/type/';
  urlcreate = 'http://localhost:8080/api/anime/create/';

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

  constructor(
    private typeService: TypeService,
    private animeService: AnimeService,
    private genreService: GenreService,
    public dialog: MatDialog,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogcreateanimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  Create() {

    const formData = new FormData();

    if (this.poster) {
      formData.append('file', this.poster, this.poster.name);
    }

    formData.append('name', this.name);
    formData.append('origName', this.origname);
    formData.append('desc', this.desc);
    formData.append('rating', this.rating.toString());
    formData.append('duration', this.duration.toString());
    formData.append('player', this.player)

    const selectedType = this.myFormGroup.get('type')?.value;
    formData.append('type', selectedType);

    const selectedGenres = this.genres.value;
    for (const genreId of selectedGenres) {
      formData.append('genres', genreId.id);
    }
    
    this.http.post<ResponseType>(this.urlcreate, formData).subscribe(
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

  ngOnInit() {
    this.typeService.getTypes().subscribe((data: TypeDTO[]) => {
      this.typeDTOlist = data;
    });

    this.genreService.getGenres().subscribe((data: GenreDTO[]) => {
      this.genreDTOlist = data;
    });

    this.myFormGroup = new FormGroup({
      type: new FormControl(null),
    });

  }
    
}
