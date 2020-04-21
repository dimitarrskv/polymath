import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  isLoggedIn: boolean;
  userDetails: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private configurations: ConfigurationService
  ) { }

  googleLogin() {
    window.open(`${this.configurations.baseUrl}/auth/login/google-oauth`,"google oauth2","location=1,status=1,scrollbars=1, width=800,height=800");
  }

  afterLogin() {
    if (this.isAuthenticated()) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.redirectUrl ? this.redirectUrl : '/profile';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
    }
  }

  isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      // Check whether the token is expired and return
      // true or false
      return token && !this.jwtHelper.isTokenExpired(token) && this.setUserDetails(token);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn = this.isAuthenticated();
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = this.isAuthenticated();
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
}

  setUserDetails(token: string) {
    this.userDetails = this.jwtHelper.decodeToken(token);
    return true;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.configurations.baseUrl}/auth/me`);
  }


}
