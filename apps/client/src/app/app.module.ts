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
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { GoogleOutline, InstagramOutline, LinkedinOutline, GithubOutline, MediumOutline, TwitterOutline, YoutubeOutline, DribbbleOutline, CameraOutline, LogoutOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';

registerLocaleData(en);

export function jwtOptionsFactory() {
  return {
      tokenGetter: () => localStorage.getItem('token') ? localStorage.getItem('token').split('Bearer ')[1] : '',
      whitelistedDomains: ['localhost:3000']
  };
}

const icons = [InstagramOutline, LinkedinOutline, GithubOutline, MediumOutline, TwitterOutline, YoutubeOutline, DribbbleOutline, CameraOutline, LogoutOutline, GoogleOutline]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    NgxsModule.forRoot([], { developmentMode: !environment.production }),

    JwtModule.forRoot({
      jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory
      }
    }),

    CoreModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
