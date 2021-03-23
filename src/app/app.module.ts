import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/homePage/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { StoreModule } from '@ngrx/store';

import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { ComicsComponent } from './components/comics/my-comics/comics.component';

import { ComicsDetailsComponent } from './components/comics/comic-details/comics-details.component';
import { ComicCardComponent } from './components/comics/comic-card/comic-card.component';
import { FiltersBarComponent } from './components/shared/filters-bar/filters-bar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { AuthReducer } from './store/auth/auth.reducer';

import { LazyLoadingScrollComponent } from './components/shared/lazy-loading-scroll/lazy-loading-scroll.component';
import { ComicMoreDetailsComponent } from './components/comics/comic-more-details/comic-more-details.component';

import { CharacterBadgeComponent } from './components/comics/character-badge/character-badge.component';

import { AddModalComponent } from './components/shared/modals/add-modal/add-modal.component';

import { RemoveModalComponent } from './components/shared/modals/remove-modal/remove-modal.component';

import { FavoriteBuyComponent } from './components/shared/favorite-buy/favorite-buy.component';
import { SoonComponent } from './components/shared/soon/soon.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastComponent } from './components/shared/toast/toast.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/feature_modules/auth/auth.module';
import { SharedModule } from './modules/shared_modules/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    FavoritesComponent,
    ComicsComponent,
    ComicsDetailsComponent,
    ComicCardComponent,
    FiltersBarComponent,

    LazyLoadingScrollComponent,
    ComicMoreDetailsComponent,
    CharacterBadgeComponent,
    AddModalComponent,
    RemoveModalComponent,
    FavoriteBuyComponent,
    SoonComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: AuthReducer }, {}),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
