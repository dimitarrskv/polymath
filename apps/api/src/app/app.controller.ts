import { Controller, Get, HttpException, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';
import { InstagramAPIService } from './auth/instagram-api.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LinkedinService } from './auth/linkedin.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Instagram } from './instagram/instagram.entity';
import { InstagramService } from './instagram/instagram.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private instagramAPIService: InstagramAPIService,
    private usersService: UsersService,
    private linkedinService: LinkedinService,
    private instagramService: InstagramService
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneByEmail(req.user.email);
    return user;
  }

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

  @UseGuards(AuthGuard('linkedin'))
  @Get('auth/login/linkedin-oauth')
  async linkedinLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, AuthGuard('linkedin'))
  @Get('linkedin-oauth/callback')
  async linkedinLoginCallback(@Request() req, @Response() res)
  {
    // handles the LinkedIn OAuth2 callback

    // Obtain My Profile
    try {
      let response = await this.linkedinService.getMyProfile(req.user.accessToken);
      console.log(response);
    } catch (error) {
      console.error('Obtaining My Profile failed: ', error.response?.data?.error?.message || 'but could not retrieve error message');
      throw new HttpException('Obtaining My Profile failed', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOneByEmail(req.user.email);
    user.linkedin = req.user.username;

    this.usersService.update(user);

    res.send({ success: true })
  }

  @UseGuards(AuthGuard('instagram'))
  @Get('auth/login/instagram-oauth')
  async instagramLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('instagram-oauth/callback')
  async instagramLoginCallback(@Request() req, @Response() res)
  {
    // handles the Instagram OAuth2 callback
    const code: string = req.query.code;
    let username, access_token, user_id, expires_in, myProfile;

    // Obtain Short Lived Token
    try {
      let response = { access_token, user_id} = await this.instagramAPIService.exchangeCodeForAccessToken(code);
      console.log(response);
    } catch (error) {
      console.error('Obtaining Access Token failed: ', error.response?.data?.error_message || 'but could not retrieve error message');
      throw new HttpException('Obtaining Access Token failed', HttpStatus.BAD_REQUEST);
    }

    // Obtain Long Lived Token
    try {
      let response = { access_token, expires_in} = await this.instagramAPIService.exchangeShortLivedTokenForLongLivedToken(access_token);
    } catch (error) {
      console.error('Obtaining Long Lived Access Token failed: ', error.response?.data?.error?.message || 'failed but could not retrieve error message');
      throw new HttpException('Obtaining Long Lived Access Token failed', HttpStatus.BAD_REQUEST);
    }

    // Obtain My Profile
    try {
      myProfile = { username } = await this.instagramAPIService.getMyProfile(access_token);
    } catch (error) {
      console.error('Obtaining My Profile failed: ', error.response?.data?.error?.message || 'but could not retrieve error message');
      throw new HttpException('Obtaining My Profile failed', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOneByEmail(req.user.email);
    
    let instagram = new Instagram();
    instagram.username = username;
    instagram.instagramUserId = user_id;
    instagram.accessToken = access_token;
    
    user.instagram = instagram;

    await this.usersService.save(user);

    res.send({ success: true })
  }
}
