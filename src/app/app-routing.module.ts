import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { HomeComponent } from './components/homePage/home/home.component';
import { ComicsComponent } from './components/comics/my-comics/comics.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ComicsDetailsComponent } from './components/comics/comic-details/comics-details.component';
import { SoonComponent } from './components/shared/soon/soon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },

  { path: 'comics', component: ComicsComponent, canActivate: [AuthGuard] },
  { path: 'comics/:id', component: ComicsDetailsComponent },

  { path: 'soon', component: SoonComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
