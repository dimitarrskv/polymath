import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private moduleRef: ModuleRef, private configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('GOOGLE_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL : 'http://localhost:3000/google-oauth/callback',
      passReqToCallback: true,
      scope: ['email profile']
    });  
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
      try
      {
        const jwt: string = await this.authService.validateOAuthLogin(profile.id, 'google');
        const user = { jwt }

        done(null, user);
      }
      catch(err)
      {
        console.log(err)
        done(err, false);
      }
    }
}