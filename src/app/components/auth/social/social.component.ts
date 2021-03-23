import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
declare var gapi: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  @Input() auth: 'login' | 'register';
  isError: string;
  constructor(public authService: UsersService, private router: Router) {}

  ngOnInit(): void {}
  //! google sign in
  public onGoogleSignin() {
    this.authService
      .googleSignin()
      .then((user) => {
        this.router.navigate(['/']);
      })
      .catch((err) => (this.isError = err));
  }
  //! facebook sign in
  public onFacebookSignin() {
    this.authService
      .FacebookAuth()
      .then((user) => {
        this.router.navigate(['/']);
      })
      .catch((err) => (this.isError = err));
  }
}
