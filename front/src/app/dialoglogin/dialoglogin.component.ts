import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../serv/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDTO } from '../models/userDTO';

@Component({
  selector: 'dialoglogin',
  templateUrl: 'dialoglogin.component.html',
  styleUrls: ['dialoglogin.component.css'],
})
export class DialogloginComponent {
  username = '';
  password = '';

  uri = 'http://localhost:8080/api/auth';

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogloginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  Login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post(this.uri + '/authenticate', JSON.stringify(body), httpOptions).subscribe(
      (res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          const user: UserDTO = res.user;
          const userJsonString = JSON.stringify(user);
          localStorage.setItem('user', userJsonString);

          this.authService.updateAuthState(true);
          if (user.role==="ADMIN"){
            this.authService.updateAuthStateAdmin(true);
          }
          this.dialogRef.close();
        } else {
        }
      },
      (error: any) => {
        alert(`Error: ${error}`);
      }
    );
  }

  ngOnInit() {
  }
}