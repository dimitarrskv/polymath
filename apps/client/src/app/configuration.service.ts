import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  get clientBaseUrl(): string {
    return 'http://localhost:4200';
}

  get baseUrl(): string {
      return 'http://localhost:3000';
  }

  get googleOAuthUrl(): string {
      return 'https://accounts.google.com/o/oauth2/v2/auth';
  }

  get googleClientID(): string {
      return '326833504315-9l02474j1nsukl5nkppaeca2dcf9041u.apps.googleusercontent.com';
  }
}
