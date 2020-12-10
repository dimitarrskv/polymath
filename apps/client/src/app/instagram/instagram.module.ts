import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstagramComponent } from './containers/instagram/instagram.component';
import { RouterModule, Routes } from '@angular/router';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const routes: Routes = [
  { path: '', component: InstagramComponent }
];

@NgModule({
  declarations: [InstagramComponent],
  imports: [
    CommonModule,

    NzCardModule,
    NzListModule,
    NzIconModule,
    NzToolTipModule,
    NzButtonModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzListModule,
    NzMenuModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InstagramModule { }