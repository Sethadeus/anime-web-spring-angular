import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from './anime';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = "http://localhost:8080/api/anime/all/?page=1&size=40";
  private urlGetById = "http://localhost:8080/api/anime/id/";
  
  constructor(private http: HttpClient) { }

  getAnimes(): Observable<Anime[]>{
    return this.http.get<Anime[]>(`${this.baseUrl}`);
  }

  getById(id: string){
    return this.http.get<Anime>(`${this.urlGetById}?id=${id}`);
  }

  private animeUpdated = new Subject<void>();

  animeUpdated$ = this.animeUpdated.asObservable();

  updateAnimeList() {
    this.animeUpdated.next();
  }
  
}