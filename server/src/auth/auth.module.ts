import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { GoogleOAuthStrategy } from './google-oauth.strategy';
import { LinkedinOAuthStrategy } from './linkedin-oauth.strategy';
import { InstagramOAuthStrategy } from './instagram-oauth.strategy';
import { InstagramService } from './instagram.service';

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
  providers: [AuthService, LocalStrategy, GoogleOAuthStrategy, LinkedinOAuthStrategy, InstagramOAuthStrategy, InstagramService, JwtStrategy],
  exports: [AuthService, JwtStrategy, InstagramService],
})
export class AuthModule {}
