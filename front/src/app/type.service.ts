import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeDTO } from './models/typeDTO';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private baseUrl = "http://localhost:8080/api/type/all/";
  private baseUrlcreate = "http://localhost:8080/api/type/create/";
  private baseUrldelete = "http://localhost:8080/api/type/delete/";
  
  constructor(private http: HttpClient) { }
  
  private typeUpdated = new Subject<void>();

  typeUpdated$ = this.typeUpdated.asObservable();

  updateTypeList() {
    this.typeUpdated.next();
  }

  getTypes(): Observable<TypeDTO[]>{
    return this.http.get<TypeDTO[]>(`${this.baseUrl}`);
  }

  Delete(id: number){
    this.http.delete<boolean>(`${this.baseUrldelete}?id=${id}`).subscribe(
      (response) => {
        console.log('Success:', response);
        this.updateTypeList();
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
        this.updateTypeList();
      },
      (error) => {
        console.error('Error:', error);
        this.updateTypeList();
      }
    )
  }

}
