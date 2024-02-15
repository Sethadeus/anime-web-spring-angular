import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UserDTO } from '../models/userDTO';

@Injectable({

  providedIn: 'root'

})

export class AuthService {

  uri = 'http://localhost:8080/api/auth';
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {this.initAuthState();}

  private authChangedSource = new BehaviorSubject<boolean>(false);
  private authChangedSourceAdmin = new BehaviorSubject<boolean>(false);

  authChanged = this.authChangedSource.asObservable();
  authChangedAdmin = this.authChangedSourceAdmin.asObservable();


  private initAuthState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const isAuthenticated = !!token;
      this.authChangedSource.next(isAuthenticated);

      const userJsonString = localStorage.getItem('user');
      if (userJsonString!=null){
        const user: UserDTO = JSON.parse(userJsonString);
        this.authChangedSourceAdmin.next(user.role === "ADMIN");
      }
    }


  }

  updateAuthState(isAuthenticated: boolean): void {
    this.authChangedSource.next(isAuthenticated);
  }

  updateAuthStateAdmin(isAdmin: boolean): void {
    this.authChangedSourceAdmin.next(isAdmin);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  logout(): void {
    this.authChangedSource.next(false);
    this.authChangedSourceAdmin.next(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userJsonString = localStorage.getItem('user');
      
      if (userJsonString!=null){
        const user: UserDTO = JSON.parse(userJsonString);
        return (user.role === "ADMIN");
      }
      return false;
    }
    return false;
  }

}
