import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxsModule } from '@ngxs/store';

import { MyProfileState } from './state/my-profile.state';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

const routes: Routes = [
  { path: '', component: MyProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzCardModule,
    NzListModule,
    NzIconModule,
    NzToolTipModule,
    NzButtonModule,
    NzSkeletonModule,

    NgxsModule.forFeature([MyProfileState]),
  ],
  exports: [RouterModule],
  declarations: [MyProfileComponent]
})
export class MyProfileModule { }
