import { Controller, Request, Post, UseGuards, Get, Response } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private appService: AppService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('auth/login/google-oauth')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Request() req) {
    // initiates the Google OAuth2 login flow
  }

  @Get('google-oauth/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Response() res)
  {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(`${this.configService.get('CLIENT_URL')}/login/success/` + jwt);
    else 
      res.redirect(`${this.configService.get('CLIENT_URL')}/login/failure/`);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('linkedin'))
  @Get('auth/login/linkedin-oauth')
  async linkedinLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('linkedin'))
  @Get('linkedin-oauth/callback')
  linkedinLoginCallback(@Request() req, @Response() res)
  {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    console.log('LinkedIn Logged In')
    if (jwt)
      res.redirect(`${this.configService.get('CLIENT_URL')}/profile`);
    else 
      res.redirect(`${this.configService.get('CLIENT_URL')}/login/failure/`);
  }
}