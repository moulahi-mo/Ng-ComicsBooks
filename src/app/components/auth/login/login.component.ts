import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;
  isError: string;
  isLoading: boolean;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
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
    console.log(form.value);
    //* signup with fire auth
    this.auth
      .login(email, password)
      //! success
      .then((response) => {
        console.log(response);
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
