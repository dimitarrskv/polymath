import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-linkedin-oauth-callback',
  templateUrl: './linkedin-oauth-callback.component.html',
  styleUrls: ['./linkedin-oauth-callback.component.less']
})
export class LinkedinOauthCallbackComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private configurations: ConfigurationService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.linkedinOauthCallback(code).toPromise().then(() => {
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      alert('Linkedin Authorization Failed');
      this.router.navigate(['/profile']);
    })
  }

  linkedinOauthCallback(code: string): Observable<any> {
    let accessToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });


    let params = new HttpParams()
      .set("code", code);

    const url = `${this.configurations.baseUrl}/linkedin-oauth/callback`;
    return this.http.get<any>(url, { headers, params });
  }

}
