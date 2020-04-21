import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-google-oauth-callback',
  templateUrl: './google-oauth-callback.component.html',
  styleUrls: ['./google-oauth-callback.component.less']
})
export class GoogleOauthCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const accessToken = this.router.url.split('access_token=')[1].split('&token_type=')[0];

    this.authService.googleLogin(accessToken)
      .then(() => this.authService.afterLogin());
  }

}
