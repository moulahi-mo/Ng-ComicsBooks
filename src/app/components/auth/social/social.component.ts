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

  public onGoogleSignin() {
    this.authService
      .googleSignin()
      .then((user) => {
        console.log(user, 'is here google');
        this.router.navigate(['/']);
      })
      .catch((err) => (this.isError = err));
  }

  public onFacebookSignin() {
    this.authService
      .FacebookAuth()
      .then((user) => {
        console.log(user, 'is here facebook');
        this.router.navigate(['/']);
      })
      .catch((err) => (this.isError = err));
  }
}
