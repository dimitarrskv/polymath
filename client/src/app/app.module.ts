import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { GoogleOauthCallbackComponent } from './login/google-oauth-callback/google-oauth-callback.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(en);

export function jwtOptionsFactory() {
  return {
      tokenGetter: () => localStorage.getItem('token') ? localStorage.getItem('token').split('Bearer ')[1] : '',
      whitelistedDomains: ['localhost:3000']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GoogleOauthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory
      }
    }),

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
