import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // isAuth: boolean;
  isAuth$ = new Observable<boolean>();
  constructor(
    private auth: AuthService,
    private store: Store<{ auth: boolean }>
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select('auth');
    // this.auth.authState().subscribe((user) => {
    //   if (user.uid) {
    //     this.isAuth = true;
    //   } else {
    //     this.isAuth = false;
    //   }
    //   console.log(user);
    // });
  }
}
