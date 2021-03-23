import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import fadeAnimation from 'src/app/shared/animations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation],
})
export class LoginComponent implements OnInit {
  isShown: boolean = false;
  user: User;
  isError: string;
  isLoading: boolean;
  isHiden: boolean = true;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    //* set timeout for animation intro
    setTimeout(() => {
      this.isShown = true;
    }, 500);
    //! init propreties
    this.isError = null;
    this.isLoading = false;

    this.user = {
      email: null,
      password: null,
    };
  }

  public onSubmit(form: NgForm) {
    this.isLoading = true;
    this.isError = null;
    const email = form.value.email.trim();
    const password = form.value.password.trim();

    //* signup with fire auth
    this.auth
      .login(email, password)
      //! success
      .then((response) => {
        if (response.user.uid) {
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      })
      //! error
      .catch((error) => {
        this.isLoading = false;
        this.isError = error.error?.message
          ? error.error?.message
          : error.message;
      });
  }
}
