import { Controller, Request, Post, UseGuards, Get, Response } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { GoogleOAuthGuard } from './auth/google-oauth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('auth/login/google-oauth')
  async googleLogin(@Request() req) {
    // initiates the Google OAuth2 login flow
    // return this.authService.login(req.user);
  }

  @Get('google-oauth/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Response() res)
  {
      // handles the Google OAuth2 callback
      const jwt: string = req.user.jwt;
      if (jwt)
          res.redirect('http://localhost:4200/login/succes/' + jwt);
      else 
          res.redirect('http://localhost:4200/login/failure');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}