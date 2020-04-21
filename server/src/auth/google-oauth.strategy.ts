import { Strategy } from 'passport-google-oauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef, private configService: ConfigService) {
    super({
      consumerKey: configService.get('GOOGLE_ID'),
      consumerSecret: configService.get('GOOGLE_SECRET'),
      passReqToCallback: true,
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