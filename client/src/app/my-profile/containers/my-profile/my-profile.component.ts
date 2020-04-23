import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit(): void {
  }

  linkProfile(serviceKey: string) {
    alert('TODO: Not Implemented')
  }

  updateProfilePhoto() {
    alert('TODO: Not Implemented')
  }

}
