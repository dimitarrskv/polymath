import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'apps/api/src/app/users/users.service';
import { User } from 'apps/api/src/app/users/user.entity';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private moduleRef: ModuleRef,
    private configService: ConfigService,
    private authService: AuthService,
    private usersService: UsersService) {
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
        const email = profile.emails[0].value;
        
        // Create User if it does not exist
        let user: User = await this.usersService.findOneByEmail(email);
        if (!user) {
            user = new User();

            user.email = email;
            user.firstName = profile.name.givenName;
            user.lastName = profile.name.familyName;
            user.profilePhoto = profile.photos[0]?.value;

            await this.usersService.create(user);
        }

        const jwt: string = await this.authService.validateOAuthLogin(email);

        done(null, { jwt });
      }
      catch(err)
      {
        console.log(err)
        done(err, false);
      }
    }
}