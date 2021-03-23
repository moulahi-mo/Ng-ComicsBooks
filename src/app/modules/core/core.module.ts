import { NgModule } from '@angular/core';
import { SwRegistrationOptions } from '@angular/service-worker';

import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { ComicsService } from 'src/app/services/comics.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FiltersServiceService } from 'src/app/services/filters-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyComicsService } from 'src/app/services/my-comics.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    UsersService,
    ComicsService,
    LocalStorageService,
    FiltersServiceService,
    MyComicsService,
    FavoritesService,
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    },
  ],
})
export class CoreModule {}
