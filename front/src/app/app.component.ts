import { AuthService } from './serv/auth.service';
import { Component } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import { DialogloginComponent } from './dialoglogin/dialoglogin.component';
import { DialogSignUpComponent } from './dialogsignup/dialogsignup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isAuthenticated: boolean = this.authService.isAuthenticated();

  isAdmin: boolean = this.authService.isAdmin();

  constructor(private authService: AuthService, public dialog: MatDialog) { }


  openDialog() {
    this.dialog.open(DialogloginComponent);
  }

  openDialogSignUp() {
    this.dialog.open(DialogSignUpComponent);
  }

  ngOnInit() {

    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();

    this.authService.authChanged.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.authChangedAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.authService.logout();
  }

}

