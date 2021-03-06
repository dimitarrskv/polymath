import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinOAuthStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private moduleRef: ModuleRef, private configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('LINKEDIN_ID'),
      clientSecret: configService.get('LINKEDIN_SECRET'),
      callbackURL : 'http://localhost:4200/linkedin-oauth/callback',
      passReqToCallback: true,
      scope: ['r_emailaddress', 'r_liteprofile'] 
    });  
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
      try
      {

        done(null, { ...profile, email: request.user.email, accessToken });
      }
      catch(err)
      {
        console.log(err)
        done(err, false);
      }
    }
}