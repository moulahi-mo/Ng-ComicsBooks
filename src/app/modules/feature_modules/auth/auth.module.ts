import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { SocialComponent } from 'src/app/components/auth/social/social.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from 'src/app/store/auth/auth.reducer';
import { environment } from 'src/environments/environment';
import { AuthRoutingModule } from '../../routing_modules/auth-routing/auth-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SocialComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    StoreModule.forFeature('auth', AuthReducer),
    AuthRoutingModule,
  ],
  exports: [LoginComponent, RegisterComponent, SocialComponent],
})
export class AuthModule {}
