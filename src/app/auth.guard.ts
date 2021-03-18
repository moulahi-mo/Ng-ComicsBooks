import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuth$: Observable<string>;
  constructor(private router: Router, private store: Store<{ auth: string }>) {
    this.isAuth$ = this.store.select('auth');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.isAuth$.subscribe((uid) => {
      if (!uid) {
        console.log('guard is not auth');
        this.router.navigate(['/auth/login']);
      }
    });

    return true;
  }
}
