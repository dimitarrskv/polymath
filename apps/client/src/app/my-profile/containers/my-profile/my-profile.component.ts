import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'apps/client/src/app/configuration.service';
import { AuthService } from 'apps/client/src/app/auth.service';
import { Select, Store } from '@ngxs/store';
import { GetMyProfile, MyProfileState } from '../../state/my-profile.state';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {

  @Select(MyProfileState.profile)
  profile$: Observable<Profile>;
  
  services: { key: string; displayName: string; handle?: string }[] = [
    {
      key: 'instagram',
      displayName: 'Instagram',
      handle: 'https://www.instagram.com/{key}'
    },
    {
      key: 'linkedin',
      displayName: 'LinkedIn',
      handle: 'https://www.linkedin.com/in/{key}'
    },
    {
      key: 'github',
      displayName: 'GitHub'
    },
    {
      key: 'twitter',
      displayName: 'Twitter'
    },
    {
      key: 'medium',
      displayName: 'Medium'
    },
    {
      key: 'youtube',
      displayName: 'YouTube'
    },
    {
      key: 'dribbble',
      displayName: 'Dribbble'
    }
  ];
  
  constructor(
    private configurations: ConfigurationService,
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch([new GetMyProfile()]);
    
  }

  linkProfile(serviceKey: string) {
    switch(serviceKey) {
      case 'instagram': window.open(`${this.configurations.baseUrl}/auth/login/instagram-oauth`,"instagram oauth2","location=1,status=1,scrollbars=1, width=800,height=800"); break;
      case 'linkedin': window.open(`${this.configurations.baseUrl}/auth/login/linkedin-oauth`,"linkedin oauth2","location=1,status=1,scrollbars=1, width=800,height=800"); break;
    }
  }

  getHandle(key: string, handle: string) {
    return handle.replace('{key}', key);
  }

  updateProfilePhoto() {
    alert('TODO: Not Implemented') 
  }

  logout() {
    this.authService.logout();
  }

}
