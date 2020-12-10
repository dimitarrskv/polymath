import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-instagram';

@Injectable()
export class InstagramOAuthStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(private moduleRef: ModuleRef, private configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('INSTAGRAM_ID'),
      clientSecret: configService.get('INSTAGRAM_SECRET'),
      callbackURL : 'https://localhost:4200/instagram-oauth/callback',
      scope: ['user_profile']
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
      try
      {
        console.log()
        done(null, profile);
      }
      catch(err)
      {
        console.log(err)
        done(err, false);
      }
    }
}