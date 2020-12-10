import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class LinkedinService {
  constructor(private configService: ConfigService, private httpService: HttpService) { 

  }

  async getMyProfile(accessToken: string): Promise<{ id: string; username: string; }> {

    const headers = { 'Authorization': `Bearer ${accessToken}` }

    return await this.httpService.get(`https://api.linkedin.com/v2/me?projection=(id,vanityName,localizedHeadline)`, { headers })
      .pipe(map(response => response.data))
      .toPromise()
  }
}