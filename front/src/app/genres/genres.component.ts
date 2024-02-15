import { Component } from '@angular/core';
import { GenreDTO } from '../models/genreDTO';
import { GenreService } from '../genre.service';
import { HttpClient } from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipListbox } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { TypeDTO } from '../models/typeDTO';
import { TypeService } from '../type.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {

  genres: GenreDTO[] = [];
  types: TypeDTO[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  constructor(private genreService: GenreService, private http: HttpClient, private typeService: TypeService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((data: GenreDTO[]) => {
      this.genres = data;
    });

    this.typeService.getTypes().subscribe((data: TypeDTO[]) => {
      this.types = data;
    });

    this.subscription = this.genreService.genreUpdated$.subscribe(() => {
      this.refreshGenreList();
    });

    this.subscription2 = this.typeService.typeUpdated$.subscribe(() => {
      this.refreshTypeList();
    });

  }

  refreshGenreList() {
    this.genreService.getGenres().subscribe((data: GenreDTO[]) => {
      this.genres = data;
    });
  }

  refreshTypeList() {
    this.typeService.getTypes().subscribe((data: TypeDTO[]) => {
      this.types = data;
    });
  }
  
  private subscription!: Subscription;
  private subscription2!: Subscription;

  addGenre(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {

      this.genreService.Create(value)

    }

    // Сбросим значение ввода после добавления
    if (input) {
      input.value = '';
    }
  }

  remove(genre: GenreDTO): void {
    console.log(genre.id);
    this.genreService.Delete(genre.id)
  }

  removeType(type: TypeDTO): void {
    console.log(type.id);
    this.typeService.Delete(type.id)
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {

      this.typeService.Create(value)

    }

    // Сбросим значение ввода после добавления
    if (input) {
      input.value = '';
    }
  }


}
