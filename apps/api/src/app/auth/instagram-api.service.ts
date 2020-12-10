import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class InstagramAPIService {
  constructor(private configService: ConfigService, private httpService: HttpService) { 

  }

  async exchangeCodeForAccessToken(code: string): Promise<{ access_token: string; user_id: string; }> {
    const args = {
      client_id: this.configService.get('INSTAGRAM_ID'),
      client_secret: this.configService.get('INSTAGRAM_SECRET'),
      grant_type: 'authorization_code',
      redirect_uri: 'https://localhost:4200/instagram-oauth/callback',
      code: code
    }

    const payload = Object.keys(args)
      .map(key => `${key}=${args[key]}`)
      .join('&');

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    return await this.httpService.post('https://api.instagram.com/oauth/access_token', payload, { headers })
      .pipe(map(response => response.data))
      .toPromise()
  }

  async exchangeShortLivedTokenForLongLivedToken(access_token: string): Promise<{ expires_in: number; access_token: string; }> {
    const args = {
      client_secret: this.configService.get('INSTAGRAM_SECRET'),
      grant_type: 'ig_exchange_token',
      access_token
    }

    const payload = Object.keys(args)
      .map(key => `${key}=${args[key]}`)
      .join('&');

    return await this.httpService.get(`https://graph.instagram.com/access_token?${payload}`)
      .pipe(map(response => response.data))
      .toPromise()
  }

  async getMyProfile(access_token: string): Promise<{ id: string; username: string; }> {
    const args = {
      access_token,
      fields: 'id, username'
    }

    const payload = Object.keys(args)
      .map(key => `${key}=${args[key]}`)
      .join('&');

    return await this.httpService.get(`https://graph.instagram.com/me?${payload}`)
      .pipe(map(response => response.data))
      .toPromise()
  }

  async getMyProfileTest(access_token: string, userId: string): Promise<any> {
    const args = {
      access_token,
      fields: 'name, website'
    }

    const payload = Object.keys(args)
      .map(key => `${key}=${args[key]}`)
      .join('&');

    return await this.httpService.get(`https://graph.instagram.com/${userId}?${payload}`)
      .pipe(map(response => response.data))
      .toPromise()
  }
}