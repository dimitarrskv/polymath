import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { GoogleOAuthStrategy } from './google-oauth.strategy';
import { LinkedinOAuthStrategy } from './linkedin-oauth.strategy';
import { InstagramOAuthStrategy } from './instagram-oauth.strategy';
import { InstagramAPIService } from './instagram-api.service';
import { LinkedinService } from './linkedin.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,

    HttpModule
  ],
  providers: [AuthService, LocalStrategy, GoogleOAuthStrategy, LinkedinOAuthStrategy, InstagramOAuthStrategy, InstagramAPIService, LinkedinService, JwtStrategy],
  exports: [AuthService, JwtStrategy, InstagramAPIService, LinkedinService],
})
export class AuthModule {}
