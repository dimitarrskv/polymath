import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ConfigurationService } from 'src/app/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configurations: ConfigurationService
  ) { }

  get profile(): Observable<any> {
    let accessToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });


    let params = new HttpParams()
      .set("secret_token", accessToken);

    const url = `${this.configurations.baseUrl}/profile`;
    return this.http.get<any>(url, { headers, params });
  }
}
