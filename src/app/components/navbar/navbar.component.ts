import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<string>;
  username: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<{ auth: string }>,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.username = 'guest';
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe((id: string) => {
      if (id) {
        console.log(id);
        this.getCurrUser(id);
      } else {
        console.log('no user found');
      }
    });
  }

  public getCurrUser(uid: string) {
    this.usersService.getUserById(uid).subscribe((user: User) => {
      console.log(user);
    });
  }

  public onLogout() {
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => console.log(error));
  }
}
