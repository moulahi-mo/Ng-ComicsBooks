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
import { ComicsComponent } from './components/comics/my-comics/comics.component';
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
import { ComicsService } from './services/comics.service';
import { NoDataComponent } from './components/shared/no-data/no-data.component';
import { LazyLoadingScrollComponent } from './components/shared/lazy-loading-scroll/lazy-loading-scroll.component';
import { ComicMoreDetailsComponent } from './components/comics/comic-more-details/comic-more-details.component';
import { LocalStorageService } from './services/local-storage.service';
import { FiltersServiceService } from './services/filters-service.service';
import { CharacterBadgeComponent } from './components/comics/character-badge/character-badge.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AddModalComponent } from './components/shared/modals/add-modal/add-modal.component';
import { MyComicsService } from './services/my-comics.service';
import { RemoveModalComponent } from './components/shared/modals/remove-modal/remove-modal.component';
import { EditModalComponent } from './components/shared/modals/edit-modal/edit-modal.component';
import { FavoriteBuyComponent } from './components/shared/favorite-buy/favorite-buy.component';
import { SoonComponent } from './components/shared/soon/soon.component';
import { FavoritesService } from './services/favorites.service';

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
    NoDataComponent,
    LazyLoadingScrollComponent,
    ComicMoreDetailsComponent,
    CharacterBadgeComponent,
    AlertComponent,
    AddModalComponent,
    RemoveModalComponent,
    EditModalComponent,
    FavoriteBuyComponent,
    SoonComponent,
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
  providers: [
    AuthGuard,
    AuthService,
    UsersService,
    ComicsService,
    LocalStorageService,
    FiltersServiceService,
    MyComicsService,
    FavoritesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
