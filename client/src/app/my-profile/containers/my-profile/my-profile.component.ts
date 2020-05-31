import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/configuration.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {

  services: any[] = [
    {
      key: 'linkedin',
      displayName: 'LinkedIn'
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
  
  constructor(private configurations: ConfigurationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  linkProfile(serviceKey: string) {
    switch(serviceKey) {
      case 'linkedin': window.open(`${this.configurations.baseUrl}/auth/login/linkedin-oauth`,"google oauth2","location=1,status=1,scrollbars=1, width=800,height=800");
    }
  }

  updateProfilePhoto() {
    alert('TODO: Not Implemented') 
  }

  logout() {
    this.authService.logout();
  }

}
