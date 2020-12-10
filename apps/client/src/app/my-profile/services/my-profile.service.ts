import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { AuthService } from '../../auth.service';
import { ConfigurationService } from '../../configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configurations: ConfigurationService
  ) { }

  get profile(): Observable<Profile> {
    let accessToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });


    let params = new HttpParams()
      .set("secret_token", accessToken);

    return this.http.get<any>(`${this.configurations.baseUrl}/profile`, { headers, params });
  }
}
