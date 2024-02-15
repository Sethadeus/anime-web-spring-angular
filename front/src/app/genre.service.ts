import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GenreDTO } from './models/genreDTO';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = "http://localhost:8080/api/genre/all/";

  private baseUrldelete = "http://localhost:8080/api/genre/delete/";

  private baseUrlcreate = "http://localhost:8080/api/genre/create/";
  
  constructor(private http: HttpClient) { }

  getGenres(): Observable<GenreDTO[]>{
    return this.http.get<GenreDTO[]>(`${this.baseUrl}`);
  }

  private genreUpdated = new Subject<void>();

  genreUpdated$ = this.genreUpdated.asObservable();

  updateGenreList() {
    this.genreUpdated.next();
  }

  Delete(id: number){
    this.http.delete<boolean>(`${this.baseUrldelete}?id=${id}`).subscribe(
      (response) => {
        console.log('Success:', response);
        this.updateGenreList();
      },
      (error) => {
        console.error('Error deleting:', error);
      }
    );
  }
  
  Create(name: string){

    const formData = new FormData();

    formData.append('name', name);
    
    this.http.post<ResponseType>(this.baseUrlcreate, formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.updateGenreList();
      },
      (error) => {
        console.error('Error:', error);
        this.updateGenreList();
      }
    )
  }

}
