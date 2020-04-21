import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private moduleRef: ModuleRef, private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL : 'http://localhost:3000/google-oauth/callback',
      passReqToCallback: true,
      scope: ['email profile']
    });  
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ) {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}