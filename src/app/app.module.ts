import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/homePage/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth.guard';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { ComicsComponent } from './components/comics/comics/comics.component';
import { SocialComponent } from './components/auth/social/social.component';
import { ComicsDetailsComponent } from './components/comics/comic-details/comics-details.component';
import { ComicCardComponent } from './components/comics/comic-card/comic-card.component';
import { FiltersBarComponent } from './components/shared/filters-bar/filters-bar.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { UsersService } from './services/users.service';
import { AuthReducer } from './store/auth/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    FavoritesComponent,
    ComicsComponent,
    SocialComponent,
    ComicsDetailsComponent,
    ComicCardComponent,
    FiltersBarComponent,
    ErrorComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: AuthReducer }, {}),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthGuard, AuthService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
