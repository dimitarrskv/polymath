import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/my-profile/models/profile.model';
import { MyProfileState } from 'src/app/my-profile/state/my-profile.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  @Select(MyProfileState.profile)
  profile$: Observable<Profile>;
  
  services: { key: string; displayName: string; disabled?: boolean; disabledReason?: string; }[] = [
    {
      key: 'instagram',
      displayName: 'Instagram'
    },
    {
      key: 'linkedin',
      displayName: 'LinkedIn'
    },
    {
      key: 'github',
      displayName: 'GitHub',
      disabled: true,
      disabledReason: 'Coming soon'
    },
    {
      key: 'twitter',
      displayName: 'Twitter',
      disabled: true,
      disabledReason: 'Coming soon'
    },
    {
      key: 'medium',
      displayName: 'Medium',
      disabled: true,
      disabledReason: 'Coming soon'
    },
    {
      key: 'youtube',
      displayName: 'YouTube',
      disabled: true,
      disabledReason: 'Coming soon'
    },
    {
      key: 'dribbble',
      displayName: 'Dribbble',
      disabled: true,
      disabledReason: 'Coming soon'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToService(service: string) {
    this.router.navigate([service])
  }

}
