import { Injectable, Provider, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateOAuthLogin(email: string): Promise<string>
    {
        try 
        {       
          const payload = { email }

          const jwt: string = sign(payload, this.configService.get('JWT_SECRET'), { expiresIn: 3600 });
          return jwt;
        }
        catch (err)
        {
          throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }

  async validateUser(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOneByEmail(email);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}